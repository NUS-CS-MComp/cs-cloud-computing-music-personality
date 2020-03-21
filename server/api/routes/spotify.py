from flask import Blueprint
from flask_restful import Api

from resources.spotify import (
    AudioFeatures,
    CategoryList,
    RecentHistory,
    RecentHistoryWithAudioFeatures,
)

SPOTIFY_BLUEPRINT = Blueprint("spotify", __name__, url_prefix="/spotify")
Api(SPOTIFY_BLUEPRINT).add_resource(AudioFeatures, "/audio-features")
Api(SPOTIFY_BLUEPRINT).add_resource(CategoryList, "/category")
Api(SPOTIFY_BLUEPRINT).add_resource(RecentHistory, "/me/recent")
Api(SPOTIFY_BLUEPRINT).add_resource(
    RecentHistoryWithAudioFeatures, "/me/recent/audio-features"
)
