import requests

from flask_restful import Resource
from flask_restful.reqparse import Argument

from utils import construct_auth_bearer, parse_params


API_BASE_URL = "https://api.spotify.com/v1"
API_URL_CATEGORIES = f"{API_BASE_URL}/browse/categories"
API_URL_RECENTLY_PLAYED = f"{API_BASE_URL}/me/player/recently-played"
API_URL_AUDIO_FEATURES = f"{API_BASE_URL}/audio-features"


def spotify_token_required(*args):
    """
    Request decorator to specified required token value

    :return: Function wrapper to set request to handle required token value
    :rtype: function
    """
    return parse_params(Argument("token", location="args", required=True), *args)


class CategoryList(Resource):
    """
    Spotify song category list resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Spotify song category list resource class
    :rtype: Resource
    """

    @staticmethod
    @spotify_token_required()
    def get(token):
        """
        GET endpoint to return category list of songs

        :param token: Spotify API access token
        :type token: str
        :return: JSON data of available song categories
        :rtype: BaseResponse
        """
        response = requests.get(
            API_URL_CATEGORIES, headers=construct_auth_bearer(token)
        )
        return response.json(), response.status_code


class RecentHistory(Resource):
    """
    Spotify user listening history resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Spotify user listening history resource class
    :rtype: Resource
    """

    @staticmethod
    @spotify_token_required()
    def get(token):
        """
        GET endpoint to return recent listened songs of user

        :param token: Spotify API access token
        :type token: str
        :return: JSON data of song history
        :rtype: BaseResponse
        """
        response = requests.get(
            API_URL_RECENTLY_PLAYED, headers=construct_auth_bearer(token)
        )
        return response.json(), response.status_code


def getAudioFeatures(token, track_id):
    """
    Helper function to get audio features of a track

    :param token: Spotify API access token
    :type token: str
    :param track_id: Track ID
    :type track_id: str
    :return: JSON data of tract audio features
    :rtype: BaseResponse
    """
    response = requests.get(
        f"{API_URL_AUDIO_FEATURES}/{track_id}", headers=construct_auth_bearer(token)
    )
    return response.json(), response.status_code


class AudioFeatures(Resource):
    """
    Spotify song audio feature resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Spotify song audio feature resource class
    :rtype: Resource
    """

    @staticmethod
    @spotify_token_required()
    @parse_params(Argument("track_id", location="args", required=True))
    def get(token, track_id):
        """
        GET endpoint to return audio features of a track

        :param token: Spotify API access token
        :type token: str
        :param track_id: Track ID
        :type track_id: str
        :return: JSON data of tract audio features
        :rtype: BaseResponse
        """
        return getAudioFeatures(token, track_id)


class RecentHistoryWithAudioFeatures(Resource):
    """
    Spotify recent track audio feature resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Spotify recent track audio feature resource class
    :rtype: Resource
    """

    @staticmethod
    @spotify_token_required()
    def get(token):
        """
        GET endpoint to return aggregated audio features of recent tracks played by user

        :param token: Spotify API access token
        :type token: str
        :return: JSON data of audio feature data of recent tracks
        :rtype: BaseResponse
        """
        (recently_played,) = RecentHistory.get()["items"]
        audio_features = []
        for song in recently_played:
            track_id = song["track"]["id"]
            (feature,) = getAudioFeatures(token=token, track_id=track_id)
            feature["track_name"] = song["track"]["name"]
            audio_features += [feature]
        return {"features": audio_features}, 200


class User(Resource):
    """
    Spotify user profile resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Spotify user profile resource class
    :rtype: Resource
    """

    @staticmethod
    @parse_params(Argument("access_token", location="args", required=True),)
    def get(access_token):
        """
        GET endpoint for fetching individual user profile by default

        :param access_token: Access token acquired to access Spotify API
        :type access_token: str
        :return: Flask base response class containing JSON data
        :rtype: BaseResponse
        """
        url = f"{API_BASE_URL}/me"
        response = requests.get(url, headers=construct_auth_bearer(access_token))
        return response.json(), response.status_code
