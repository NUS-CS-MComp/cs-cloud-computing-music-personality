from flask import Blueprint
from flask_restful import Api

from resources.oauth import (
    FacebookOAuth,
    SpotifyOAuth,
    RedditOAuth,
    TwitterOAuth,
    TwitterOAuthVerifier,
)

"""
Include all routes for platform OAuth process handling
OAuth handling routes end with /oauth route and only POST is allowed
"""
OAUTH_BLUEPRINT = Blueprint("oauth", __name__, url_prefix="/oauth")

Api(OAUTH_BLUEPRINT).add_resource(FacebookOAuth, "/facebook")

Api(OAUTH_BLUEPRINT).add_resource(RedditOAuth, "/reddit")

Api(OAUTH_BLUEPRINT).add_resource(SpotifyOAuth, "/spotify")

Api(OAUTH_BLUEPRINT).add_resource(TwitterOAuth, "/twitter/init")
Api(OAUTH_BLUEPRINT).add_resource(TwitterOAuthVerifier, "/twitter/verify")
