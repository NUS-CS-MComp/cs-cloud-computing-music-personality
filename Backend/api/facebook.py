import time
from flask import (Blueprint, jsonify, request)
import requests

bp = Blueprint('facebook', __name__,)

@bp.route('/getFacebookPosts', methods=['GET'])
def get_facebook_posts():
    url = 'https://graph.facebook.com/' + request.args.get('userId') + '/feed?access_token=' + request.args.get('accessToken')
    return requests.get(url).content