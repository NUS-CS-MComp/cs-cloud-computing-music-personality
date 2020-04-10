from flask import session
from flask_restful import Resource
from flask_restful.reqparse import Argument

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
        services = SERVICES_FOR_AUTH
        if provider is not None:
            services = list(
                filter(lambda service: service.service_name == provider, services)
            )

        auth_info = {}
        for service in services:
            service_name = service.service_name
            auth_info[service_name] = UserAuthentication.authenticate_user(
                service,
                (None if service_name not in token_info else token_info[service_name]),
            )

        session_data = session.get(AUTH_SERVER_SESSION_KEY)
        if session_data is None:
            session[AUTH_SERVER_SESSION_KEY] = auth_info
        else:
            session_data = session_data.copy()
            session_data.update(auth_info)
            session[AUTH_SERVER_SESSION_KEY] = session_data

        return auth_info, 200

    @staticmethod
    def authenticate_user(service, service_token_info):
        """
        Helper function to authenticate user through fetching user profile from the provider

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
                return UserAuthentication.construct_auth_info(False)

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
            return UserAuthentication.construct_auth_info(True, False, user_profile)

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
