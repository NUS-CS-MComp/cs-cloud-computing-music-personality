import os

from flask import Flask
from flask import jsonify
from . import spotify
from . import facebook

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    app.register_blueprint(spotify.bp)
    app.register_blueprint(facebook.bp)

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return jsonify({'data': 'Hello, World!'})

    return app
