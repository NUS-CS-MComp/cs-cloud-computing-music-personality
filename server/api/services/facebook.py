import os

from services.base import BaseService


class Facebook(BaseService):
    def exchange_token(self, code, callback_url):
        """
        Retrieve the access token given after acquiring authorization code

        Detailed archived documentation can be found at https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow

        :param code: A one-time use code that may be exchanged for a bearer token
        :type code: str
        :param callback_url: Callback URL from application domain
        :type callback_url: str
        :return: Base service result object containing response data
        :rtype: BaseServiceResult
        """
        return self.get(
            route="oauth/access_token",
            parse_json=True,
            params={
                "client_id": FACEBOOK_CLIENT_ID,
                "client_secret": FACEBOOK_CLIENT_SECRET,
                "code": code,
                "redirect_uri": callback_url,
            },
        )

    def get_user_post(self, access_token, user_id="me"):
        """
        Fetch individual user post by default

        :param access_token: Access token acquired from Facebook OAuth process
        :type access_token: str
        :param user_id: Facebook user ID, defaults to 'me'
        :type user_id: str, optional
        :return: Base service result object containing response data
        :rtype: BaseServiceResult
        """

        def extract_post_data(post_data):
            """
            Helper function to extract post data

            :param post_data: Received post data information
            :type post_data: dict
            :return: Processed post data information
            :rtype: dict
            """
            import datetime

            return {
                "message": post_data["message"],
                "time": datetime.datetime.strptime(
                    post_data["created_time"], "%Y-%m-%dT%H:%M:%S+0000"
                )
                .replace(tzinfo=datetime.timezone.utc)
                .timestamp(),
                "id": post_data["id"],
            }

        response = self.get(
            route=f"{user_id}/feed", params={"access_token": access_token}
        )
        post_data = response.data["data"]
        post_data = list(filter(lambda post: "message" in post.keys(), post_data))
        response.data = list(map(lambda post: extract_post_data(post), post_data))
        return response

    def get_user_profile(self, access_token, user_id="me"):
        """
        Fetch individual user profile by default

        :param access_token: Access token acquired to access Facebook Graph API
        :type access_token: str
        :param user_id: Facebook user ID, defaults to 'me'
        :type user_id: str, optional
        :return: Base service result object containing response data
        :rtype: BaseServiceResult
        """
        response = self.get(route=f"{user_id}", params={"access_token": access_token})
        if (
            response.status_code == 400
            and type(response.data) == dict
            and response.data["error"]["code"] == 190
        ):
            response.status_code = 401
        return response


FACEBOOK_API_BASE_URL = "https://graph.facebook.com/v6.0"
FACEBOOK_CLIENT_ID = os.getenv("FACEBOOK_CLIENT_ID")
FACEBOOK_CLIENT_SECRET = os.getenv("FACEBOOK_CLIENT_SECRET")

FacebookService = Facebook("facebook", FACEBOOK_API_BASE_URL)
