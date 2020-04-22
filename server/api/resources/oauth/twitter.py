from flask_restful import Resource
from flask_restful.reqparse import Argument

from services import TwitterService
from utils import parse_params, IdentityManager


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
        response = TwitterService.init_oauth_process(callback_url)
        return response.data, response.status_code


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
    @IdentityManager.set_cookie(TwitterService)
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
        response = TwitterService.exchange_oauth_token(oauth_token, oauth_verifier)
        return response.data, response.status_code
