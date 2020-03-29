import os

from services.base import BaseService
from utils import construct_auth_bearer


class Reddit(BaseService):
    def exchange_token(self, code, callback_url):
        """
        Retrieve the access token given after acquiring authorization code

        Detailed archived documentation can be found at https://github.com/reddit-archive/reddit/wiki/oauth2

        :param code: A one-time use code that may be exchanged for a bearer token
        :type code: str
        :param callback_url: Callback URL from application domain
        :type callback_url: str
        :return: Base service result object containing response data
        :rtype: BaseServiceResult
        """
        self.requestor.auth = (REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET)
        return self.post(
            "access_token",
            params={
                "code": code,
                "grant_type": "authorization_code",
                "redirect_uri": callback_url,
            },
        )

    def get_user_post(self, access_token, user_name):
        """
        Fetch individual user post by default

        :param access_token: Access token acquired to access Reddit API
        :type access_token: str
        :param user_name: Username from Reddit
        :type user_name: str
        :return: Base service result object containing response data
        :rtype: BaseServiceResult
        """
        url = self.construct_url(
            REDDIT_RESOURCE_API_BASE_URL, "user", f"{user_name}/comments"
        )
        return self.get(url, headers=construct_auth_bearer(access_token))

    def get_user_profile(self, access_token):
        """
        Fetch individual user profile by default

        :param access_token: Access token acquired to access Reddit API
        :type access_token: str
        :return: Base service result object containing response data
        :rtype: BaseServiceResult
        """
        url = self.construct_url(REDDIT_RESOURCE_API_BASE_URL, "api/v1", "me")
        return self.get(url, headers=construct_auth_bearer(access_token))


REDDIT_API_BASE_URL = "https://www.reddit.com/api/v1"
REDDIT_RESOURCE_API_BASE_URL = "https://oauth.reddit.com/"
REDDIT_CLIENT_ID = os.getenv("REDDIT_CLIENT_ID")
REDDIT_CLIENT_SECRET = os.getenv("REDDIT_CLIENT_SECRET")

RedditService = Reddit("reddit", REDDIT_API_BASE_URL, use_session=True)
