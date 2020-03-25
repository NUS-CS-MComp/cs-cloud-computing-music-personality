from flask import Blueprint
from flask_restful import Api

from resources.facebook import FacebookPost
from resources.twitter import TwitterOAuth, TwitterOAuthVerifier

SOCIAL_MEDIA_BLUEPRINT = Blueprint("social", __name__, url_prefix="/social")
Api(SOCIAL_MEDIA_BLUEPRINT).add_resource(FacebookPost, "/facebook/posts")
Api(SOCIAL_MEDIA_BLUEPRINT).add_resource(TwitterOAuth, "/twitter/oauth")
Api(SOCIAL_MEDIA_BLUEPRINT).add_resource(TwitterOAuthVerifier, "/twitter/oauth/verify")
