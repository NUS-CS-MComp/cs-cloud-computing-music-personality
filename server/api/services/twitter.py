import os

from urllib.parse import parse_qsl, urlsplit

from services.base import BaseService, BaseServiceResult
from utils import construct_auth_oauth1


class Twitter(BaseService):
    def init_oauth_process(self, callback_url):
        """
        Initiate temporary OAuth token and secret

        Correspond with Step 1 in https://developer.twitter.com/en/docs/basics/authentication/guides/log-in-with-twitter

        :param callback_url: Callback URL from application domain
        :type callback_url: str
        :return: Base service result object containing response data
        :rtype: BaseServiceResult
        """
        url = self.construct_url("oauth/request_token")
        response = self.post(
            url,
            parse_json=False,
            headers=Twitter.construct_twitter_oauth1_header(
                url, oauth_callback=callback_url
            ),
        )
        data_parsed = Twitter.parse_twitter_oauth_query_string(response.data)
        return BaseServiceResult(response.status_code, data_parsed)

    def exchange_oauth_token(self, oauth_token, oauth_verifier):
        """
        Retrieve usable OAuth token to access Twitter resources

        Correspond with Step 3 in https://developer.twitter.com/en/docs/basics/authentication/guides/log-in-with-twitter; Step 2 is completed on client side

        :param oauth_token: OAuth token returned from client side
        :type oauth_token: str
        :param oauth_verifier: Verifier token returned from client side after authorization
        :type oauth_verifier: str
        :return: Base service result object containing response data
        :rtype: BaseServiceResult
        """
        url = self.construct_url("oauth/access_token")
        response = self.post(
            url,
            parse_json=False,
            params={"oauth_verifier": oauth_verifier},
            headers=Twitter.construct_twitter_oauth1_header(
                url, token=oauth_token, oauth_verifier=oauth_verifier
            ),
        )
        data_parsed = Twitter.parse_twitter_oauth_query_string(response.data)
        return BaseServiceResult(response.status_code, data_parsed)

    def get_user_feed(self, oauth_token, oauth_token_secret, **kwargs):
        """
        Fetch individual user feed by default

        :param oauth_token: Access token acquired to access Twitter API
        :type oauth_token: str
        :param oauth_token_secret: Access token secret acquired to access Twitter API
        :type oauth_token_secret: str
        :return: Base service result object containing response data
        :rtype: BaseServiceResult
        """

        def extract_post_data(post_data):
            """
            Helper function to extract feed data

            :param post_data: Received feed data information
            :type post_data: dict
            :return: Processed feed data information
            :rtype: dict
            """
            import datetime

            return {
                "message": post_data["text"],
                "time": datetime.datetime.strptime(
                    post_data["created_at"], "%a %b %d %H:%M:%S +0000 %Y"
                )
                .replace(tzinfo=datetime.timezone.utc)
                .timestamp(),
                "id": post_data["id_str"],
            }

        params = {key: value for key, value in kwargs.items() if value is not None}
        url = self.construct_url("1.1/statuses/user_timeline.json")
        response = self.get(
            url,
            params=params,
            headers=Twitter.construct_twitter_oauth1_header(
                url,
                method="GET",
                token=oauth_token,
                token_secret=oauth_token_secret,
                **params,
            ),
        )
        feeds = list(filter(lambda feed: "text" in feed.keys(), response.data))
        response.data = list(map(lambda feed: extract_post_data(feed), feeds))
        return response

    def get_user_profile(self, oauth_token, oauth_token_secret):
        """
        Fetch individual user profile by default

        :param oauth_token: Access token acquired to access Twitter API
        :type oauth_token: str
        :param oauth_token_secret: Access token secret acquired to access Twitter API
        :type oauth_token_secret: str
        :return: Base service result object containing response data
        :rtype: BaseServiceResult
        """
        url = self.construct_url("1.1/account/verify_credentials.json")
        return self.get(
            url,
            headers=Twitter.construct_twitter_oauth1_header(
                url, method="GET", token=oauth_token, token_secret=oauth_token_secret,
            ),
        )

    @staticmethod
    def construct_twitter_oauth1_header(
        url, method="POST", token=None, token_secret=None, **kwargs
    ):
        """
        Helper function to construct OAuth authorization header string

        :param url: Base URL to request relevant resources
        :type url: str
        :param token: Resource owner token key, defaults to None
        :type token: str, optional
        :param token_secret: Resource owner token secret, defaults to None
        :type token_secret: str, optional
        :return: Authorization header dictionary object containing OAuth string data
        :rtype: dict
        """
        return construct_auth_oauth1(
            url,
            method,
            TWITTER_CONSUMER_KEY,
            TWITTER_CONSUMER_KEY_SECRET,
            token,
            token_secret,
            **kwargs,
        )

    @staticmethod
    def parse_twitter_oauth_query_string(query_string):
        """
        Helper function to parse OAuth query string returned from Twitter

        :param original_string: Original query string object
        :type original_string: str
        :return: JSON data of parsed data
        :rtype: dict
        """
        try:
            return dict(parse_qsl(urlsplit("?" + query_string).query))
        except ValueError:
            return {}


TWITTER_API_BASE_URL = "https://api.twitter.com"
TWITTER_CONSUMER_KEY = os.getenv("TWITTER_CONSUMER_KEY")
TWITTER_CONSUMER_KEY_SECRET = os.getenv("TWITTER_CONSUMER_KEY_SECRET")

TwitterService = Twitter("twitter", TWITTER_API_BASE_URL)
