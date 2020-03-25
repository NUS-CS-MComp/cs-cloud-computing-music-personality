import json
import requests

from flask import jsonify
from flask_restful import Resource
from flask_restful.reqparse import Argument

from utils import construct_auth_bearer, parse_params


API_BASE_URL = "https://api.spotify.com/v1"
API_URL_CATEGORIES = f"{API_BASE_URL}/browse/categories"
API_URL_RECENTLY_PLAYED = f"{API_BASE_URL}/me/player/recently-played"
API_URL_AUDIO_FEATURES = f"{API_BASE_URL}/audio-features"


def spotify_token_required():
    """
    Request decorator to specified required token value

    :return: Function wrapper to set request to handle required token value
    :rtype: function
    """
    return parse_params(Argument("token", location="args", required=True),)


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
        return response.content


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
        return response.content


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
    def get(track_id, token):
        """
        GET endpoint to return audio features of a track

        :param track_id: Track ID
        :type track_id: str
        :param token: Spotify API access token
        :type token: str
        :return: JSON data of tract audio features
        :rtype: BaseResponse
        """
        response = requests.get(
            f"{API_URL_AUDIO_FEATURES}/{track_id}", headers=construct_auth_bearer(token)
        )
        return response.content


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
        recently_played = json.loads(RecentHistory.get(token).decode("utf8"))["items"]
        audio_features = []
        for song in recently_played:
            track_id = song["track"]["id"]
            feature = json.loads(AudioFeatures.get(track_id, token).decode("utf8"))
            feature["track_name"] = song["track"]["name"]
            audio_features += [feature]
        return jsonify({"features": audio_features})
