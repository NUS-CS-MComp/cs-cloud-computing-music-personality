import time
from flask import (Blueprint, jsonify)
import requests

bp = Blueprint('tgrst', __name__,)


@bp.route('/time', methods=['GET'])
def get_current_time():
    headers = {'Authorization': 'Bearer BQDy5r83iDp153xn7DTMnj8bHi9fw3cn9Y3CJbIOw5CE2NctqI-ch3hQV3OOZl2qcqYycEEE4EuWI2ln91zObK8QOHyc9ibX0jKOJeJPO0dUj0AQ-v4UYGIA4CiEEehu5Ob9-O8zvmBNbks2ZQ'}
    print(requests.get('https://api.spotify.com/v1/browse/categories',
                       headers=headers).content)
    return jsonify({'time': time.time()})
