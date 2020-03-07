from flask import (Blueprint, request)
import requests

BP = Blueprint('spotify', __name__,)

URL_CATEGORIES = 'https://api.spotify.com/v1/browse/categories'
URL_RECENTLY_PLAYED = 'https://api.spotify.com/v1/me/player/recently-played'


@BP.route('/getSpotifyCategories', methods=['GET'])
def get_spotify_categories():
    headers = {'Authorization': 'Bearer ' + request.args.get('token')}
    return requests.get(URL_CATEGORIES, headers=headers).content


@BP.route('/getSpotifyRecentlyPlayed', methods=['GET'])
def get_spotify_recently_played():
    headers = {'Authorization': 'Bearer ' + request.args.get('token')}
    return requests.get(URL_RECENTLY_PLAYED, headers=headers).content
