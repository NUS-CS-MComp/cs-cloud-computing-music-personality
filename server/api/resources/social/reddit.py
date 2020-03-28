import requests

from flask_restful import Resource
from flask_restful.reqparse import Argument

from utils import parse_params, construct_auth_bearer, construct_user_agent


API_BASE_URL = "https://www.reddit.com/api/v1"
RESOURCE_API_BASE_URL = "https://oauth.reddit.com/api/v1"
USER_API_BASE_URL = "https://oauth.reddit.com/user"


class RedditPost(Resource):
    """
    Reddit user post resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Reddit user post resource class
    :rtype: Resource
    """

    @staticmethod
    @parse_params(
        Argument("access_token", location="args", required=True),
        Argument("user_name", location="args", required=True),
    )
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
        url = f"{USER_API_BASE_URL}/{user_name}/comments"
        session = requests.Session()
        session.headers.update(construct_user_agent())
        session.headers.update(construct_auth_bearer(access_token))
        response = session.get(url)
        return response.json(), response.status_code


class RedditUser(Resource):
    """
    Reddit user profile resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Reddit user profile resource class
    :rtype: Resource
    """

    @staticmethod
    @parse_params(Argument("access_token", location="args", required=True),)
    def get(access_token):
        """
        GET endpoint for fetching individual user profile by default

        :param access_token: Access token acquired to access Reddit API
        :type access_token: str
        :return: Flask base response class containing JSON data
        :rtype: BaseResponse
        """
        url = f"{RESOURCE_API_BASE_URL}/me"
        session = requests.Session()
        session.headers.update(construct_user_agent())
        session.headers.update(construct_auth_bearer(access_token))
        response = session.get(url)
        return response.json(), response.status_code
