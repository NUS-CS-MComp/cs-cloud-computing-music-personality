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
    @parse_params(Argument("provider", location="json", required=False),)
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
        auth_info = {}

        services = SERVICES_FOR_AUTH
        for service in SERVICES_FOR_AUTH:
            """
            Use specific service provider if existing
            """
            if provider is None:
                break
            if service.service_name == provider:
                services = [service]
                break

        for service in services:
            service_name = service.service_name
            if service_name not in token_info:
                auth_info[service_name] = UserAuthentication.construct_auth_info(False)
            else:
                user_profile = service.get_user_profile(**token_info[service_name])
                auth_info[
                    service_name
                ] = UserAuthentication.parse_user_profile_response(user_profile)
        return auth_info, 200

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
                False, user_profile_response.data
            )
        if is_ok(user_profile_response.status_code):
            return UserAuthentication.construct_auth_info(
                True, user_profile_response.data
            )

    @staticmethod
    def construct_auth_info(is_authenticated, data=None):
        """
        Helper function to construct meaningful authentication information

        :param is_authenticated: Boolean flag to indicate whether user is authenticated
        :type is_authenticated: bool
        :param data: User identity data, defaults to None
        :type data: dict, optional
        :return: Authentication information data object
        :rtype: dict
        """
        if not is_authenticated:
            return {"authenticated": False}
        else:
            return {"authenticated": True, "data": data}
