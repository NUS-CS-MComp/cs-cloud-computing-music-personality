from flask_restful import Resource
from flask_restful.reqparse import Argument

from services import SpotifyService
from utils import parse_params, IdentityManager


def spotify_access_token_required(*args):
    """
    Request decorator to specified required token value

    :return: Function wrapper to set request to handle required token value
    :rtype: function
    """
    return parse_params(Argument("access_token", location="args", required=True), *args)


class CategoryList(Resource):
    """
    Spotify song category list resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Spotify song category list resource class
    :rtype: Resource
    """

    @staticmethod
    @IdentityManager.read_cookie(SpotifyService, ["access_token"])
    def get(access_token):
        """
        GET endpoint to return category list of songs

        :param token: Spotify API access token
        :type token: str
        :return: JSON data of available song categories
        :rtype: BaseResponse
        """
        response = SpotifyService.get_category(access_token)
        return response.data, response.status_code


class RecentHistory(Resource):
    """
    Spotify user listening history resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Spotify user listening history resource class
    :rtype: Resource
    """

    @staticmethod
    @IdentityManager.read_cookie(SpotifyService, ["access_token"])
    def get(access_token):
        """
        GET endpoint to return recent listened songs of user

        :param token: Spotify API access token
        :type token: str
        :return: JSON data of song history
        :rtype: BaseResponse
        """
        response = SpotifyService.get_recent_history(access_token)
        return response.data, response.status_code


class AudioFeatures(Resource):
    """
    Spotify song audio feature resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Spotify song audio feature resource class
    :rtype: Resource
    """

    @staticmethod
    @IdentityManager.read_cookie(SpotifyService, ["access_token"])
    @parse_params(Argument("track_id", location="args", required=True))
    def get(access_token, track_id):
        """
        GET endpoint to return audio features of a track

        :param token: Spotify API access token
        :type token: str
        :param track_id: Track ID
        :type track_id: str
        :return: JSON data of tract audio features
        :rtype: BaseResponse
        """
        response = SpotifyService.get_audio_features(access_token, track_id)
        return response.data, response.status_code


class RecentHistoryWithAudioFeatures(Resource):
    """
    Spotify recent track audio feature resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Spotify recent track audio feature resource class
    :rtype: Resource
    """

    @staticmethod
    @IdentityManager.read_cookie(SpotifyService, ["access_token"])
    def get(access_token):
        """
        GET endpoint to return aggregated audio features of recent tracks played by user

        :param token: Spotify API access token
        :type token: str
        :return: JSON data of audio feature data of recent tracks
        :rtype: BaseResponse
        """
        response = SpotifyService.get_recent_history_audio_features(access_token)
        return response.data, response.status_code


class User(Resource):
    """
    Spotify user profile resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Spotify user profile resource class
    :rtype: Resource
    """

    @staticmethod
    @IdentityManager.read_cookie(SpotifyService, ["access_token"])
    def get(access_token):
        """
        GET endpoint for fetching individual user profile by default

        :param access_token: Access token acquired to access Spotify API
        :type access_token: str
        :return: Flask base response class containing JSON data
        :rtype: BaseResponse
        """
        response = SpotifyService.get_user_profile(access_token)
        return response.data, response.status_code
