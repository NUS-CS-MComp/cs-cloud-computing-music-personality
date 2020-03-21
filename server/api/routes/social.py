from flask import Blueprint
from flask_restful import Api

from resources.facebook import FacebookPost

SOCIAL_MEDIA_BLUEPRINT = Blueprint("social", __name__, url_prefix="/social")
Api(SOCIAL_MEDIA_BLUEPRINT).add_resource(FacebookPost, "/facebook/posts")
