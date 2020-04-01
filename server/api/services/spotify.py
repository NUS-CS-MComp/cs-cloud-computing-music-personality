import os

from services.base import BaseService, BaseServiceResult
from utils import construct_auth_bearer


class Spotify(BaseService):
    def exchange_token(self, code, callback_url):
        """
        Retrieve the access token given after acquiring authorization code

        :param code: A one-time use code that may be exchanged for a bearer token
        :type code: str
        :param callback_url: Callback URL from application domain
        :type callback_url: str
        :return: Base service result object containing response data
        :rtype: BaseServiceResult
        """
        url = self.construct_url(SPOTIFY_ACCOUNT_API_BASE_URL, "api", "token")
        self.requestor.auth = (SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET)
        return self.post(
            url,
            data={
                "code": code,
                "grant_type": "authorization_code",
                "redirect_uri": callback_url,
            },
        )

    def get_category(self, access_token):
        """
        Fetch category list of songs

        :param access_token: Spotify API access token
        :type access_token: str
        :return: Base service result object containing response data
        :rtype: BaseServiceResult
        """
        return self.get(
            "browse/categories", headers=construct_auth_bearer(access_token)
        )

    def get_recent_history(self, access_token):
        """
        Fetch recent listened songs of user

        :param access_token: Spotify API access token
        :type access_token: str
        :return: Base service result object containing response data
        :rtype: BaseServiceResult
        """
        return self.get(
            "me/player/recently-played", headers=construct_auth_bearer(access_token)
        )

    def get_audio_features(self, access_token, track_id):
        """
        Fetch audio features of a track

        :param access_token: Spotify API access token
        :type access_token: str
        :param track_id: Track ID
        :type track_id: str
        :return: Base service result object containing response data
        :rtype: BaseServiceResult
        """
        return self.get(
            f"audio-features/{track_id}", headers=construct_auth_bearer(access_token)
        )

    def get_recent_history_audio_features(self, access_token):
        """
        Get aggregated audio features of recent tracks played by user

        :param access_token: Spotify API access token
        :type access_token: str
        :return: Base service result object containing response data
        :rtype: BaseServiceResult
        """
        recently_played = self.get_recent_history(access_token)
        audio_features = []
        for track in recently_played.data:
            track_id = track["track"]["id"]
            track_feature = self.get_audio_features(
                access_token=access_token, track_id=track_id
            )
            track_feature["track_name"] = track["track"]["ame"]
            audio_features.append(track_feature.data)
        return BaseServiceResult(200, {"features": audio_features})

    def get_user_profile(self, access_token):
        """
        Fetch individual user profile by default

        :param access_token: Access token acquired to access Spotify API
        :type access_token: str
        :return: Base service result object containing response data
        :rtype: BaseServiceResult
        """
        return self.get("me", headers=construct_auth_bearer(access_token))


SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1"
SPOTIFY_ACCOUNT_API_BASE_URL = "https://accounts.spotify.com/api"
SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")

SpotifyService = Spotify("spotify", SPOTIFY_API_BASE_URL, use_session=True)