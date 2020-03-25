import os
import requests
from urllib.parse import parse_qsl, urlsplit

from flask import jsonify
from flask_restful import Resource
from flask_restful.reqparse import Argument

from utils import construct_auth_oauth1, parse_params

API_BASE_URL = "https://api.twitter.com"

TWITTER_CONSUMER_KEY = os.getenv("TWITTER_CONSUMER_KEY")
TWITTER_CONSUMER_KEY_SECRET = os.getenv("TWITTER_CONSUMER_KEY_SECRET")
TWITTER_ACCESS_TOKEN = os.getenv("TWITTER_ACCESS_TOKEN")
TWITTER_ACCESS_TOKEN_SECRET = os.getenv("TWITTER_ACCESS_TOKEN_SECRET")


def construct_twitter_oauth1(url, token=None, token_secret=None, **kwargs):
    return construct_auth_oauth1(
        url,
        "POST",
        TWITTER_CONSUMER_KEY,
        TWITTER_CONSUMER_KEY_SECRET,
        token or TWITTER_ACCESS_TOKEN,
        token_secret or TWITTER_ACCESS_TOKEN_SECRET,
        **kwargs,
    )


class TwitterOAuth(Resource):
    @staticmethod
    @parse_params(Argument("callback_url", location="args", required=True),)
    def post(callback_url):
        url = f"{API_BASE_URL}/oauth/request_token"
        response = requests.post(
            url, headers=construct_twitter_oauth1(url, oauth_callback=callback_url),
        )
        return jsonify(dict(parse_qsl(urlsplit("?" + response.text).query)))


class TwitterOAuthVerifier(Resource):
    @staticmethod
    @parse_params(
        Argument("oauth_token", location="args", required=True),
        Argument("oauth_verifier", location="args", required=True),
    )
    def post(oauth_token, oauth_verifier):
        url = f"{API_BASE_URL}/oauth/access_token"
        response = requests.post(
            url,
            params={oauth_verifier: oauth_verifier},
            headers=construct_twitter_oauth1(
                url, oauth_token, oauth_verifier=oauth_verifier
            ),
        )
        return jsonify(dict(parse_qsl(urlsplit("?" + response.text).query)))
