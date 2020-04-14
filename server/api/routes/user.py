from flask import Blueprint
from flask_restful import Api

from resources.social.facebook import FacebookUser
from resources.social.reddit import RedditUser
from resources.social.twitter import TwitterUser
from resources.spotify import User as SpotifyUser
from resources.user import UserAuthentication, UserRecord

"""
Include all routes for user related contents and information from third-party platforms
Routes start with prefix /user
"""
USER_BLUEPRINT = Blueprint("user", __name__, url_prefix="/user")
Api(USER_BLUEPRINT).add_resource(FacebookUser, "/profile/facebook")
Api(USER_BLUEPRINT).add_resource(RedditUser, "/profile/reddit")
Api(USER_BLUEPRINT).add_resource(TwitterUser, "/profile/twitter")
Api(USER_BLUEPRINT).add_resource(SpotifyUser, "/profile/spotify")
Api(USER_BLUEPRINT).add_resource(UserAuthentication, "/authenticate")
Api(USER_BLUEPRINT).add_resource(UserRecord, "/me")
