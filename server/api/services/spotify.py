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

    def get_recent_history(self, access_token, raw=False):
        """
        Fetch recent listened songs of user

        :param access_token: Spotify API access token
        :type access_token: str
        :param raw: Flag to retrieve raw data format
        :type raw: bool
        :return: Base service result object containing response data
        :rtype: BaseServiceResult
        """

        def format_track_history(track_history):
            """
            Helper function to format track history

            :param track_history: Track history data
            :type track_history: dict
            """
            import datetime

            track_info = track_history["track"]
            artist_info = track_info["artists"]
            return {
                "id": track_info["id"],
                "name": track_info["name"],
                "artist": ", ".join(map(lambda artist: artist["name"], artist_info)),
                "time": datetime.datetime.strptime(
                    track_history["played_at"], "%Y-%m-%dT%H:%M:%S.%fZ"
                )
                .replace(tzinfo=datetime.timezone.utc)
                .timestamp(),
                "url": track_info["external_urls"]["spotify"],
                "thumbnail": track_info["album"]["images"][0]["url"],
            }

        response = self.get(
            "me/player/recently-played", headers=construct_auth_bearer(access_token)
        )
        if not raw:
            response.data = list(
                map(lambda data: format_track_history(data), response.data["items"])
            )
        return response

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
        recently_played = self.get_recent_history(access_token, True)
        audio_features = []
        for track in recently_played.data["items"]:
            track_id = track["track"]["id"]
            track_feature = self.get_audio_features(
                access_token=access_token, track_id=track_id
            )
            track_feature_data = track_feature.data
            track_feature_data["track_name"] = track["track"]["name"]
            audio_features.append(track_feature_data)
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

    def extract_user_profile(self, data):
        """
        Extract user profile data

        :param data: User profile data
        :type data: dict
        :return: Processed profile data
        :rtype: dict
        """
        return {"id": data["id"], "name": data["display_name"]}


SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1"
SPOTIFY_ACCOUNT_API_BASE_URL = "https://accounts.spotify.com/api"
SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")

SpotifyService = Spotify("spotify", SPOTIFY_API_BASE_URL, use_session=True)
