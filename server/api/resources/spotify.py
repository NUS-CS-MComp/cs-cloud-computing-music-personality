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
    return parse_params(Argument("token", location="args", required=True),)


class CategoryList(Resource):
    @staticmethod
    @spotify_token_required()
    def get(token):
        response = requests.get(
            API_URL_CATEGORIES, headers=construct_auth_bearer(token)
        )
        return response.content


class RecentHistory(Resource):
    @staticmethod
    @spotify_token_required()
    def get(token):
        response = requests.get(
            API_URL_RECENTLY_PLAYED, headers=construct_auth_bearer(token)
        )
        return response.content


class AudioFeatures(Resource):
    @staticmethod
    @spotify_token_required()
    def get(track_id, token):
        response = requests.get(
            f"{API_URL_AUDIO_FEATURES}/{track_id}", headers=construct_auth_bearer(token)
        )
        return response.content


class RecentHistoryWithAudioFeatures(Resource):
    @staticmethod
    @spotify_token_required()
    def get(token):
        recently_played = json.loads(RecentHistory.get(token).decode("utf8"))["items"]
        audio_features = []
        for song in recently_played:
            track_id = song["track"]["id"]
            feature = json.loads(AudioFeatures.get(track_id, token).decode("utf8"))
            feature["track_name"] = song["track"]["name"]
            audio_features += [feature]
        return jsonify({"features": audio_features})
