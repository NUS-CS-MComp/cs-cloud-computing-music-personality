import os
import requests

from flask_restful import Resource
from flask_restful.reqparse import Argument

from resources.social.reddit import API_BASE_URL as REDDIT_API_BASE_URL

from utils import construct_user_agent, parse_params


REDDIT_CLIENT_ID = os.getenv("REDDIT_CLIENT_ID")
REDDIT_CLIENT_SECRET = os.getenv("REDDIT_CLIENT_SECRET")


class RedditOAuth(Resource):
    """
    Reddit OAuth process handler resource

    Detailed archived documentation can be found at https://github.com/reddit-archive/reddit/wiki/oauth2

    A Session object must be created to sustain the process with proper set user agent

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Reddit OAuth process resource class
    :rtype: Resource
    """

    @staticmethod
    @parse_params(
        Argument("code", location="args", required=True),
        Argument("callback_url", location="args", required=True),
    )
    def post(code, callback_url):
        """
        POST endpoint for retrieving the access token given after acquiring authorization code

        :param code: A one-time use code that may be exchanged for a bearer token
        :type code: str
        :param callback_url: Callback URL from application domain
        :type callback_url: str
        :return: JSON data of access_token on event of success authorization
        :rtype: BaseResponse
        """
        session = requests.Session()
        session.auth = (REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET)
        session.headers.update(construct_user_agent())
        response = session.post(
            f"{REDDIT_API_BASE_URL}/access_token",
            params={
                "code": code,
                "grant_type": "authorization_code",
                "redirect_uri": callback_url,
            },
        )
        return response.json(), response.status_code
