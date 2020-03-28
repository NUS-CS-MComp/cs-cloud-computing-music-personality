import os
import requests

from flask_restful import Resource
from flask_restful.reqparse import Argument

from utils import construct_user_agent, parse_params


SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
SPOTIFY_USER_RESOURCE_API_BASE_URL = "https://accounts.spotify.com/api"


class SpotifyOAuth(Resource):
    """
    Spotify OAuth process handler resource

    Detailed archived documentation can be found at https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Spotify OAuth process resource class
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
        session.auth = (SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET)
        session.headers.update(construct_user_agent())
        response = session.post(
            f"{SPOTIFY_USER_RESOURCE_API_BASE_URL}/token",
            data={
                "code": code,
                "grant_type": "authorization_code",
                "redirect_uri": callback_url,
            },
        )
        return response.json(), response.status_code
