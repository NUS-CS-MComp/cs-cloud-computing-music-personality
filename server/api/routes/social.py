from flask import Blueprint
from flask_restful import Api

from resources.social.facebook import FacebookPost
from resources.social.reddit import RedditPost
from resources.social.twitter import TwitterFeed

"""
Include all routes for social media contents
Routes start with prefix /social
"""
SOCIAL_MEDIA_BLUEPRINT = Blueprint("social", __name__, url_prefix="/social")
Api(SOCIAL_MEDIA_BLUEPRINT).add_resource(FacebookPost, "/facebook/posts")
Api(SOCIAL_MEDIA_BLUEPRINT).add_resource(RedditPost, "/reddit/posts")
Api(SOCIAL_MEDIA_BLUEPRINT).add_resource(TwitterFeed, "/twitter/posts")
