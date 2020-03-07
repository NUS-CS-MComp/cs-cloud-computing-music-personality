from flask import (Blueprint, request)
import requests

BP = Blueprint('facebook', __name__,)


@BP.route('/getFacebookPosts', methods=['GET'])
def get_facebook_posts():
    url = 'https://graph.facebook.com/' + \
        request.args.get('userId') + '/feed?access_token=' + \
        request.args.get('accessToken')
    return requests.get(url).content
