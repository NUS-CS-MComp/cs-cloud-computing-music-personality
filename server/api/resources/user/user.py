from flask import make_response, request, session
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
AUTH_SESSION_COOKIE_NAME = "auth_session_valid"
AUTH_SESSION_COOKIE_EXPIRY = 30 * 60


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
        if provider is None and request.cookies.get(AUTH_SESSION_COOKIE_NAME):
            return make_response(session[AUTH_SERVER_SESSION_KEY], 200)

        auth_info = {}
        full_auth = True

        services = SERVICES_FOR_AUTH
        for service in SERVICES_FOR_AUTH:
            """
            Use specific service provider if existing
            """
            if provider is None:
                break
            if service.service_name == provider:
                services = [service]
                full_auth = False
                break

        for service in services:
            service_name = service.service_name
            if service_name not in token_info:
                auth_info[service_name] = UserAuthentication.construct_auth_info(
                    False, False
                )
            else:
                user_profile = service.get_user_profile(**token_info[service_name])
                auth_info[
                    service_name
                ] = UserAuthentication.parse_user_profile_response(user_profile)

        if session.get(AUTH_SERVER_SESSION_KEY) is None:
            session[AUTH_SERVER_SESSION_KEY] = {}
        session[AUTH_SERVER_SESSION_KEY].update(auth_info)

        auth_response = make_response(auth_info, 200)

        if full_auth:
            auth_response.set_cookie(
                AUTH_SESSION_COOKIE_NAME,
                value=b"1",
                max_age=AUTH_SESSION_COOKIE_EXPIRY,
                httponly=True,
            )

        return auth_response

    @staticmethod
    def parse_user_profile_response(user_profile_response):
        """
        Helper function to parse response obtained by user profile request

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
            return UserAuthentication.construct_auth_info(
                True, False, user_profile_response.data
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
