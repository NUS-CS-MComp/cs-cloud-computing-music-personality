from flask_restful import Resource
from flask_restful.reqparse import Argument

from services import FacebookService
from utils import parse_params, IdentityManager


class FacebookPost(Resource):
    """
    Facebook user post resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Facebook user post resource class
    :rtype: Resource
    """

    @staticmethod
    @IdentityManager.read_cookie(FacebookService, ["access_token"])
    @parse_params(Argument("user_id", location="args", required=False, default="me"),)
    def get(access_token, user_id):
        """
        GET endpoint for fetching individual user post by default

        :param access_token: Access token acquired from Facebook OAuth process
        :type access_token: str
        :param user_id: Facebook user ID, defaults to 'me'
        :type user_id: str, optional
        :return: Flask base response class containing JSON data
        :rtype: BaseResponse
        """
        response = FacebookService.get_user_post(access_token, user_id)
        return response.data, response.status_code


class FacebookUser(Resource):
    """
    Facebook user profile resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Facebook user profile resource class
    :rtype: Resource
    """

    @staticmethod
    @IdentityManager.read_cookie(FacebookService, ["access_token"])
    @parse_params(Argument("user_id", location="args", required=False, default="me"),)
    def get(access_token, user_id):
        """
        GET endpoint for fetching individual user profile by default

        :param access_token: Access token acquired to access Facebook Graph API
        :type access_token: str
        :param user_id: Facebook user ID, defaults to 'me'
        :type user_id: str, optional
        :return: Flask base response class containing JSON data
        :rtype: BaseResponse
        """
        response = FacebookService.get_user_profile(access_token, user_id)
        return response.data, response.status_code
