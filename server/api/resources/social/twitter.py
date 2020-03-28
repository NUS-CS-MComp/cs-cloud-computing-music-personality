import requests

from flask_restful import Resource
from flask_restful.reqparse import Argument

from resources.oauth.twitter import construct_twitter_oauth1

from utils import parse_params

API_BASE_URL = "https://api.twitter.com"
RESOURCE_API_BASE_URL = "https://api.twitter.com/1.1"


class TwitterFeed(Resource):
    """
    Twitter user feed resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Twitter user feed resource class
    :rtype: Resource
    """

    @staticmethod
    @parse_params(
        Argument("oauth_token", location="args", required=True),
        Argument("oauth_token_secret", location="args", required=True),
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
        params = {key: value for key, value in kwargs.items() if value is not None}
        url = f"{RESOURCE_API_BASE_URL}/statuses/user_timeline.json"
        response = requests.get(
            url,
            params=params,
            headers=construct_twitter_oauth1(
                url,
                method="GET",
                token=oauth_token,
                token_secret=oauth_token_secret,
                **params,
            ),
        )
        return response.json(), response.status_code


class TwitterUser(Resource):
    """
    Twitter user profile resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Twitter user profile resource class
    :rtype: Resource
    """

    @staticmethod
    @parse_params(
        Argument("oauth_token", location="args", required=True),
        Argument("oauth_token_secret", location="args", required=True),
    )
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
        url = f"{RESOURCE_API_BASE_URL}/account/verify_credentials.json"
        session = requests.session()
        session.headers.update(
            construct_twitter_oauth1(
                url, method="GET", token=oauth_token, token_secret=oauth_token_secret
            )
        )
        response = session.get(url,)
        return response.json(), response.status_code
