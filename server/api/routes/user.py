from flask import Blueprint
from flask_restful import Api

from resources.social.facebook import FacebookUser
from resources.social.reddit import RedditUser
from resources.social.twitter import TwitterUser
from resources.spotify import User as SpotifyUser

"""
Include all routes for user related contents and information from third-party platforms
Routes start with prefix /user
"""
USER_PROFILE_BLUEPRINT = Blueprint("user", __name__, url_prefix="/user/profile")
Api(USER_PROFILE_BLUEPRINT).add_resource(FacebookUser, "/facebook")
Api(USER_PROFILE_BLUEPRINT).add_resource(RedditUser, "/reddit")
Api(USER_PROFILE_BLUEPRINT).add_resource(TwitterUser, "/twitter")
Api(USER_PROFILE_BLUEPRINT).add_resource(SpotifyUser, "/spotify")
