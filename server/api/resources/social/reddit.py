from flask_restful import Resource
from flask_restful.reqparse import Argument

from services import RedditService
from utils import parse_params, IdentityManager


class RedditPost(Resource):
    """
    Reddit user post resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Reddit user post resource class
    :rtype: Resource
    """

    @staticmethod
    @IdentityManager.read_cookie(RedditService, ["access_token"])
    @parse_params(Argument("user_name", location="args", required=True),)
    def get(access_token, user_name):
        """
        GET endpoint for fetching individual user post by default

        :param access_token: Access token acquired to access Reddit API
        :type access_token: str
        :param user_name: Username from Reddit
        :type user_name: str
        :return: Flask base response class containing JSON data
        :rtype: BaseResponse
        """
        response = RedditService.get_user_post(access_token, user_name)
        return response.data, response.status_code


class RedditUser(Resource):
    """
    Reddit user profile resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Reddit user profile resource class
    :rtype: Resource
    """

    @staticmethod
    @IdentityManager.read_cookie(RedditService, ["access_token"])
    def get(access_token):
        """
        GET endpoint for fetching individual user profile by default

        :param access_token: Access token acquired to access Reddit API
        :type access_token: str
        :return: Flask base response class containing JSON data
        :rtype: BaseResponse
        """
        response = RedditService.get_user_profile(access_token)
        return response.data, response.status_code
