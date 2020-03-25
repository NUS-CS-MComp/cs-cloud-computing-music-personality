from flask import Blueprint
from flask_restful import Api

from resources.spotify import (
    AudioFeatures,
    CategoryList,
    RecentHistory,
    RecentHistoryWithAudioFeatures,
)

"""
Include all routes for Spotify related resources
Routes start with prefix /spotify
"""
SPOTIFY_BLUEPRINT = Blueprint("spotify", __name__, url_prefix="/spotify")
Api(SPOTIFY_BLUEPRINT).add_resource(AudioFeatures, "/audio-features")
Api(SPOTIFY_BLUEPRINT).add_resource(CategoryList, "/category")
Api(SPOTIFY_BLUEPRINT).add_resource(RecentHistory, "/recent")
Api(SPOTIFY_BLUEPRINT).add_resource(
    RecentHistoryWithAudioFeatures, "/recent/audio-features"
)
