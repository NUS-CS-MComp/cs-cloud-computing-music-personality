import json
from flask import (Blueprint, request, jsonify)
import requests

BP = Blueprint('spotify', __name__,)

URL_CATEGORIES = 'https://api.spotify.com/v1/browse/categories'
URL_RECENTLY_PLAYED = 'https://api.spotify.com/v1/me/player/recently-played'
URL_AUDIO_FEATURES = 'https://api.spotify.com/v1/audio-features/'


@BP.route('/getSpotifyCategories', methods=['GET'])
def get_categories():
    headers = {'Authorization': 'Bearer ' + request.args.get('token')}
    return requests.get(URL_CATEGORIES, headers=headers).content


@BP.route('/getSpotifyRecentlyPlayed', methods=['GET'])
def get_recently_played():
    return get_spotify_recently_played(request.args.get('token'))


@BP.route('/getSpotifyRecentlyPlayedFeatures', methods=['GET'])
def get_recently_played_features():
    spotify_token = request.args.get('token')
    recently_played = json.loads(get_spotify_recently_played(
        spotify_token).decode('utf8'))['items']
    audio_features = []
    for song in recently_played:
        track_id = song['track']['id']
        feature = json.loads(get_spotify_audio_features(
            spotify_token, track_id).decode('utf8'))
        feature['track_name'] = song['track']['name']
        audio_features += [feature]
    return jsonify({'features': audio_features})


def get_spotify_recently_played(token):
    headers = {'Authorization': 'Bearer ' + token}
    return requests.get(URL_RECENTLY_PLAYED, headers=headers).content


def get_spotify_audio_features(token, track_id):
    headers = {'Authorization': 'Bearer ' + token}
    return requests.get(URL_AUDIO_FEATURES + track_id, headers=headers).content
