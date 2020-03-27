import requests

from flask_restful import Resource
from flask_restful.reqparse import Argument

from utils import parse_params

API_BASE_URL = "https://graph.facebook.com/v6.0"


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
        Argument("user_id", location="args", required=False, default="me"),
    )
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
        url = f"{API_BASE_URL}/{user_id}/feed"
        response = requests.get(url, params={"access_token": access_token})
        return response.json(), response.status_code


class FacebookUser(Resource):
    """
    Facebook user profile resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Facebook user profile resource class
    :rtype: Resource
    """

    @staticmethod
    @parse_params(
        Argument("access_token", location="args", required=True),
        Argument("user_id", location="args", required=False, default="me"),
    )
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
        url = f"{API_BASE_URL}/{user_id}"
        response = requests.get(url, params={"access_token": access_token})
        response_json = response.json()
        status_code = response.status_code
        if response.status_code == 400 and response_json["error"]["code"] == 190:
            status_code = 401
        return response_json, status_code
