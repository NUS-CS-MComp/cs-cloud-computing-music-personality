from flask_restful import Resource

from services import FacebookService, RedditService, SpotifyService, TwitterService
from utils import IdentityManager
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
    def post(token_info):
        """
        POST endpoint to authenticate user based on access token stored in cookies session

        :param token_info: Argument parsed from @IdentityManager.read_cookies
        :type token_info: dict
        :return: Authentication information grouped by provider names
        :rtype: dict
        """
        auth_info = {}
        for service in SERVICES_FOR_AUTH:
            service_name = service.service_name
            if service_name not in token_info:
                auth_info[service_name] = UserAuthentication.construct_auth_info(False)
            else:
                user_profile = service.get_user_profile(**token_info[service_name])
                if is_client_error(user_profile.status_code):
                    auth_info[service_name] = UserAuthentication.construct_auth_info(
                        False, user_profile.data
                    )
                if is_ok(user_profile.status_code):
                    auth_info[service_name] = UserAuthentication.construct_auth_info(
                        True, user_profile.data
                    )
        return auth_info, 200

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
