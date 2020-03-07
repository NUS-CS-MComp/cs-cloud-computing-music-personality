from flask import (Blueprint, request)
import requests

BP = Blueprint('spotify', __name__,)


@BP.route('/getSpotifyCategories', methods=['GET'])
def get_spotify_categories():
    headers = {'Authorization': 'Bearer ' + request.args.get('token')}
    return requests.get('https://api.spotify.com/v1/browse/categories', headers=headers).content
