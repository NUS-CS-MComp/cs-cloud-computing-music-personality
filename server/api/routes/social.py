from flask import Blueprint
from flask_restful import Api

from resources.social.facebook import FacebookPost
from resources.social.reddit import RedditOAuth, RedditPost
from resources.social.twitter import TwitterOAuth, TwitterOAuthVerifier, TwitterFeed

"""
Include all routes for social media OAuth process handling and content fetching
Routes start with prefix /social and OAuth handling routes end with /oauth route and only POST is allowed
"""
SOCIAL_MEDIA_BLUEPRINT = Blueprint("social", __name__, url_prefix="/social")

Api(SOCIAL_MEDIA_BLUEPRINT).add_resource(FacebookPost, "/facebook/posts")

Api(SOCIAL_MEDIA_BLUEPRINT).add_resource(RedditOAuth, "/reddit/oauth")
Api(SOCIAL_MEDIA_BLUEPRINT).add_resource(RedditPost, "/reddit/posts")

Api(SOCIAL_MEDIA_BLUEPRINT).add_resource(TwitterOAuth, "/twitter/oauth")
Api(SOCIAL_MEDIA_BLUEPRINT).add_resource(TwitterOAuthVerifier, "/twitter/oauth/verify")
Api(SOCIAL_MEDIA_BLUEPRINT).add_resource(TwitterFeed, "/twitter/posts")
