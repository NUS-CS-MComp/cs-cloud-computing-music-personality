import requests

from flask.json import jsonify
from flask_restful import Resource
from flask_restful.reqparse import Argument

from utils import parse_params

API_BASE_URL = "https://graph.facebook.com"


class FacebookPost(Resource):
    @staticmethod
    @parse_params(
        Argument("user_id", location="args", required=True),
        Argument("access_token", location="args", required=True),
    )
    def get(user_id, access_token):
        url = f"{API_BASE_URL}/{user_id}/feed"
        response = requests.get(url, params={access_token: access_token})
        return jsonify(response.content)
