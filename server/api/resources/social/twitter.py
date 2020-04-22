from flask_restful import Resource
from flask_restful.reqparse import Argument

from services import TwitterService
from utils import parse_params, IdentityManager


class TwitterFeed(Resource):
    """
    Twitter user feed resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Twitter user feed resource class
    :rtype: Resource
    """

    @staticmethod
    @IdentityManager.read_cookie(TwitterService, ["oauth_token", "oauth_token_secret"])
    @parse_params(
        Argument("user_id", location="args", required=False),
        Argument("screen_name", location="args", required=False),
    )
    def get(oauth_token, oauth_token_secret, **kwargs):
        """
        GET endpoint for fetching individual user feed by default

        :param oauth_token: Access token acquired to access Twitter API
        :type oauth_token: str
        :param oauth_token_secret: Access token secret acquired to access Twitter API
        :type oauth_token_secret: str
        :return: Flask base response class containing JSON data
        :rtype: BaseResponse
        """
        response = TwitterService.get_user_feed(oauth_token, oauth_token_secret)
        return response.data, response.status_code


class TwitterUser(Resource):
    """
    Twitter user profile resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Twitter user profile resource class
    :rtype: Resource
    """

    @staticmethod
    @IdentityManager.read_cookie(TwitterService, ["oauth_token", "oauth_token_secret"])
    def get(oauth_token, oauth_token_secret):
        """
        GET endpoint for fetching individual user profile by default

        :param oauth_token: Access token acquired to access Twitter API
        :type oauth_token: str
        :param oauth_token_secret: Access token secret acquired to access Twitter API
        :type oauth_token_secret: str
        :return: Flask base response class containing JSON data
        :rtype: BaseResponse
        """
        response = TwitterService.get_user_profile(oauth_token, oauth_token_secret)
        return response.data, response.status_code
