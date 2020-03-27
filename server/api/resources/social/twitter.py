import os
import requests
from urllib.parse import parse_qsl, urlsplit

from flask_restful import Resource
from flask_restful.reqparse import Argument

from utils import construct_auth_oauth1, parse_params

API_BASE_URL = "https://api.twitter.com"
RESOURCE_API_BASE_URL = "https://api.twitter.com/1.1"

TWITTER_CONSUMER_KEY = os.getenv("TWITTER_CONSUMER_KEY")
TWITTER_CONSUMER_KEY_SECRET = os.getenv("TWITTER_CONSUMER_KEY_SECRET")
TWITTER_ACCESS_TOKEN = os.getenv("TWITTER_ACCESS_TOKEN")
TWITTER_ACCESS_TOKEN_SECRET = os.getenv("TWITTER_ACCESS_TOKEN_SECRET")


def construct_twitter_oauth1(
    url, method="POST", token=None, token_secret=None, **kwargs
):
    """
    Helper function to construct OAuth authorization header string

    :param url: Base URL to request relevant resources
    :type url: str
    :param token: Resource owner token key, defaults to None
    :type token: str, optional
    :param token_secret: Resource owner token secret, defaults to None
    :type token_secret: str, optional
    :return: Authorization header dictionary object containing OAuth string data
    :rtype: dict
    """
    return construct_auth_oauth1(
        url,
        method,
        TWITTER_CONSUMER_KEY,
        TWITTER_CONSUMER_KEY_SECRET,
        token or TWITTER_ACCESS_TOKEN,
        token_secret or TWITTER_ACCESS_TOKEN_SECRET,
        **kwargs,
    )


class TwitterOAuth(Resource):
    """
    Twitter OAuth process handler resource

    Correspond to Step 1 in https://developer.twitter.com/en/docs/basics/authentication/guides/log-in-with-twitter

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Twitter OAuth process resource class
    :rtype: Resource
    """

    @staticmethod
    @parse_params(Argument("callback_url", location="args", required=True),)
    def post(callback_url):
        """
        POST endpoint for retrieval of temporary OAuth token and secret

        :param callback_url: Callback URL from application domain
        :type callback_url: str
        :return: JSON data of token and secret data
        :rtype: BaseResponse
        """
        url = f"{API_BASE_URL}/oauth/request_token"
        response = requests.post(
            url, headers=construct_twitter_oauth1(url, oauth_callback=callback_url),
        )
        return (
            dict(parse_qsl(urlsplit("?" + response.text).query)),
            response.status_code,
        )


class TwitterOAuthVerifier(Resource):
    """
    Twitter OAuth process verifier resource

    Correspond to Step 3 in https://developer.twitter.com/en/docs/basics/authentication/guides/log-in-with-twitter

    Step 2 is completed on client side, which sends a new OAuth and verifier string for final exchange

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Twitter OAuth process verifier resource class
    :rtype: Resource
    """

    @staticmethod
    @parse_params(
        Argument("oauth_token", location="args", required=True),
        Argument("oauth_verifier", location="args", required=True),
    )
    def post(oauth_token, oauth_verifier):
        """
        POST endpoint for retrieval of usable OAuth token to access Twitter resources

        :param oauth_token: OAuth token returned from client side
        :type oauth_token: str
        :param oauth_verifier: Verifier token returned from client side after authorization
        :type oauth_verifier: str
        :return: JSON data of usable OAuth token and basic identifier data
        :rtype: BaseResponse
        """
        url = f"{API_BASE_URL}/oauth/access_token"
        response = requests.post(
            url,
            params={"oauth_verifier": oauth_verifier},
            headers=construct_twitter_oauth1(
                url, token=oauth_token, oauth_verifier=oauth_verifier
            ),
        )
        return (
            dict(parse_qsl(urlsplit("?" + response.text).query)),
            response.status_code,
        )


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
