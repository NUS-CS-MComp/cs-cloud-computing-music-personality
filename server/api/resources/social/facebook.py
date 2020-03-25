import requests

from flask.json import jsonify
from flask_restful import Resource
from flask_restful.reqparse import Argument

from utils import parse_params

API_BASE_URL = "https://graph.facebook.com"


class FacebookPost(Resource):
    """
    Facebook user post resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Facebook user post resource class
    :rtype: Resource
    """

    @staticmethod
    @parse_params(
        Argument("access_token", location="args", required=True),
        Argument("user_id", location="args", required=False),
    )
    def get(access_token, user_id="me"):
        """
        GET endpoint for fetching individual user post by default

        :param access_token: Access token acquired from Facebook OAuth process
        :type access_token: str
        :param user_id: Facebook user ID, defaults to 'me'
        :type user_id: str, optional
        :return: Flask base response class containing JSON data
        :rtype: BaseResponse
        """
        url = f"{API_BASE_URL}/{user_id}/feed"
        response = requests.get(url, params={"access_token": access_token})
        return jsonify(response.content)
