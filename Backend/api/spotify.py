import time
from flask import (Blueprint, jsonify, request)
import requests

bp = Blueprint('spotify', __name__,)

@bp.route('/getSpotifyCategories', methods=['GET'])
def get_spotify_categories():
    headers = {'Authorization' : 'Bearer ' + request.args.get('token')}
    return requests.get('https://api.spotify.com/v1/browse/categories', headers=headers).content