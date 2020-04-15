import pickle

from functools import wraps

from flask import session
from flask_restful import Resource
from flask_restful.reqparse import Argument

from config import Config
from models.user import User
from services import FacebookService, RedditService, SpotifyService, TwitterService
from utils import parse_params, IdentityManager
from utils.check_status_code import is_client_error, is_ok


SERVICES_FOR_AUTH = [FacebookService, RedditService, SpotifyService, TwitterService]
SERVICES_FOR_AUTH_PARAMS = {
    FacebookService: ["access_token"],
    RedditService: ["access_token"],
    SpotifyService: ["access_token"],
    TwitterService: ["oauth_token", "oauth_token_secret"],
}
AUTH_SERVER_SESSION_KEY = "user_auth_info"
SIGNED_IN_AS_FLAG = "is_signed_in"


def parse_user_session(func):
    """
    Helper function decorator to parse user information from session data

    :param func: Function object to be wrapped
    :type func: func
    :return: Function wrapper
    :rtype: func
    """

    @wraps(func)
    def read_user_info(*args, **kwargs):
        """ Decorated function """

        user_id = session.get(SIGNED_IN_AS_FLAG)
        if user_id is None:
            return "No identifier provided", 403
        kwargs.update({"user_id": user_id})
        return func(*args, **kwargs)

    return read_user_info


class UserRecord(Resource):
    """
    User record resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: User authentication resource class
    :rtype: Resource
    """

    @staticmethod
    @parse_user_session
    def get(user_id):
        """
        Get endpoint to fetch user related record

        :param user_id: User identifier
        :type user_id: str
        :return: User related information
        :rtype: dict
        """
        user_data = User.get(user_id, use_json=True)
        return user_data, 200

    @staticmethod
    @parse_user_session
    @parse_params(
        Argument("name", location="json", required=False),
        Argument("short_bio", location="json", required=False),
    )
    def post(user_id, name, short_bio):
        User.update_profile_info(user_id, user_name=name, short_bio=short_bio)
        return "OK", 200

    @staticmethod
    @parse_user_session
    @parse_params(Argument("provider", location="args", required=False),)
    def delete(user_id, provider):
        if provider is None:
            User.delete(user_id)
            session.clear()
            return "OK", 200

        providers_data = User.delete_provider(user_id, provider)
        if len(providers_data) == 0:
            session.clear()
        else:
            provider_cookie_key = IdentityManager.cookie_key_formatter.format(provider)
            del session[provider_cookie_key]

        return "OK", 200


class UserAuthentication(Resource):
    """
    User authentication resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: User authentication resource class
    :rtype: Resource
    """

    @staticmethod
    @IdentityManager.read_cookies(
        SERVICES_FOR_AUTH, param_map=SERVICES_FOR_AUTH_PARAMS, kwarg_name="token_info"
    )
    @parse_params(Argument("provider", location="json", required=False))
    def post(token_info, provider):
        """
        POST endpoint to authenticate user based on access token stored in cookies session

        :param token_info: Argument parsed from @IdentityManager.read_cookies
        :type token_info: dict
        :param provider: Optional provider name string to replace full service list
        :type provider: str, optional
        :return: Authentication information grouped by provider names
        :rtype: dict
        """
        verify_info = {}
        services = UserAuthentication.verify_provider(provider)
        if services is None:
            return verify_info, 403

        for service in services:
            service_name = service.service_name
            verify_info[service_name] = UserAuthentication.verify_user(
                service,
                (None if service_name not in token_info else token_info[service_name]),
            )

        if provider is not None:
            verify_info.update(
                UserAuthentication.authenticate_user(provider, verify_info)
            )
            if True or len(verify_info.keys()) > len(services):
                verify_info.update(
                    UserAuthentication.reconcile_resource(services, verify_info)
                )

        session_data = session.get(AUTH_SERVER_SESSION_KEY)
        if session_data is None:
            session[AUTH_SERVER_SESSION_KEY] = verify_info
        else:
            session_data = session_data.copy()
            session_data.update(verify_info)
            session[AUTH_SERVER_SESSION_KEY] = session_data

        if session.get(SIGNED_IN_AS_FLAG) is not None:
            verify_info["identifier"] = session.get(SIGNED_IN_AS_FLAG)

        return verify_info, 200

    @staticmethod
    def reconcile_resource(original_services, provider_verify_info):
        """
        Helper function to reconcile verification status against original services

        :param original_services: Service list
        :type original_services: list
        :param provider_verify_info: Verification information updated from session
        :type provider_verify_info: dict
        :return: Reconciled verification status
        :rtype: dict
        """
        new_services = [
            service
            for service in SERVICES_FOR_AUTH
            if service.service_name in provider_verify_info.keys()
            and service not in original_services
        ]
        for service in new_services:
            token = session.get(IdentityManager.format_cookie_key_from_service(service))
            token_info = (
                None
                if token is None
                else {
                    token_key: token[token_key]
                    for token_key in SERVICES_FOR_AUTH_PARAMS[service]
                }
            )
            provider_verify_info[service.service_name] = UserAuthentication.verify_user(
                service, token_info
            )
        return provider_verify_info

    @staticmethod
    def authenticate_user(provider, provider_verify_info):
        """
        Authenticate user through searching for user in database and restore previous active session

        :param provider: Provider name
        :type provider: str
        :param provider_auth_info: Authentication information from user profile response
        :type provider_verify_info: dict
        :return: Boolean flag indicating authentication process
        :rtype: bool
        """
        if provider_verify_info[provider]["authenticated"]:
            signed_in_as = session.get(SIGNED_IN_AS_FLAG)

            profile_info = provider_verify_info[provider]["data"]
            user_data = User.find(provider, profile_info["id"])

            if user_data and signed_in_as:
                if user_data["user_id"] != signed_in_as:
                    provider_cookie_key = IdentityManager.cookie_key_formatter.format(
                        provider
                    )
                    del session[provider_cookie_key]
                    provider_verify_info.update(
                        {
                            provider: {
                                "authenticated": False,
                                "used": True,
                                "by_user": user_data["user_id"],
                            }
                        }
                    )
                    return provider_verify_info
            elif not user_data and not signed_in_as:
                user_data = User.create(provider, profile_info, sid=session.sid)
                session[SIGNED_IN_AS_FLAG] = user_data["user_id"]
            elif not user_data and signed_in_as:
                User.update(signed_in_as, provider, profile_info)
            else:
                User.update_sid(user_data["user_id"], session.sid)
                prev_session_key = f"{Config.SESSION_KEY_PREFIX}{user_data['sid']}"
                prev_session = Config.SESSION_REDIS.get(prev_session_key)
                if prev_session:
                    provider_cookie_key = IdentityManager.cookie_key_formatter.format(
                        provider
                    )
                    new_provider_key = session.get(provider_cookie_key)

                    session.update(pickle.loads(prev_session))
                    session[provider_cookie_key] = new_provider_key
                    Config.SESSION_REDIS.delete(prev_session_key)

                    current_provider_new_info = provider_verify_info[provider].copy()
                    provider_verify_info.update(session.get(AUTH_SERVER_SESSION_KEY))
                    provider_verify_info.update({provider: current_provider_new_info})

        return provider_verify_info

    @staticmethod
    def verify_provider(provider):
        """
        Helper function to get services list from provider name

        :param provider: Provider name
        :type provider: str
        :return: List of services to perform authentication request
        :rtype: list
        """
        services = SERVICES_FOR_AUTH
        if provider is not None:
            services = list(
                filter(lambda service: service.service_name == provider, services)
            )
        return None if len(services) <= 0 else services

    @staticmethod
    def verify_user(service, service_token_info):
        """
        Helper function to verify user through fetching user profile from the provider

        :param service: Provider service object
        :type service: BaseService
        :param service_token_info: Token info parsed from cookies store
        :type service_token_info: dict
        :return: Authentication information from user profile response
        :rtype: dict
        """
        if service_token_info is None:
            return UserAuthentication.construct_auth_info(False, False)
        else:
            try:
                user_profile = service.get_user_profile(**service_token_info)
                return UserAuthentication.parse_user_profile_response(
                    service, user_profile
                )
            except Exception:
                return UserAuthentication.construct_auth_info(False, False)

    @staticmethod
    def parse_user_profile_response(service, user_profile_response):
        """
        Helper function to parse response obtained by user profile request

        :param service: Provider service object
        :type service: BaseService
        :param user_profile_response: Response result class under base service
        :type user_profile_response: BaseServiceResult
        :return: Authentication information from user profile response
        :rtype: dict
        """
        if is_client_error(user_profile_response.status_code):
            return UserAuthentication.construct_auth_info(
                False, True, user_profile_response.data
            )
        if is_ok(user_profile_response.status_code):
            user_profile = service.extract_user_profile(user_profile_response.data)
            try:
                assert "id" in user_profile and "name" in user_profile
                return UserAuthentication.construct_auth_info(True, False, user_profile)
            except AssertionError:
                return UserAuthentication.construct_auth_info(
                    False, False, user_profile
                )

    @staticmethod
    def construct_auth_info(is_authenticated, is_expired, data=None):
        """
        Helper function to construct meaningful authentication information

        :param is_authenticated: Boolean flag to indicate whether user is authenticated
        :type is_authenticated: bool
        :param is_expired: Boolean flag to indicate whether the stored token has expired
        :type is_expired: bool
        :param data: User identity data, defaults to None
        :type data: dict, optional
        :return: Authentication information data object
        :rtype: dict
        """
        auth_info = {}
        if is_expired:
            auth_info["expired"] = True
        if not is_authenticated:
            auth_info["authenticated"] = False
        else:
            auth_info.update({"authenticated": True, "data": data})
        return auth_info
