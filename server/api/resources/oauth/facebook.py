from flask_restful import Resource
from flask_restful.reqparse import Argument

from services import FacebookService
from utils import parse_params, IdentityManager


class FacebookOAuth(Resource):
    """
    Facebook OAuth process handler resource

    Detailed archived documentation can be found at https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Facebook OAuth process resource class
    :rtype: Resource
    """

    @staticmethod
    @parse_params(
        Argument("code", location="args", required=True),
        Argument("callback_url", location="args", required=True),
    )
    @IdentityManager.set_cookie(FacebookService)
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
        response = FacebookService.exchange_token(code, callback_url)
        return response.data, response.status_code
