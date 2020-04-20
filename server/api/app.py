"""
Main thread code for server application
"""

import os
import sys

from flask import Flask
from flask.blueprints import Blueprint
from flask_cors import CORS

sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from config import Config
from lib.flask_session import Session

import routes

app = Flask(__name__, instance_relative_config=False)
app.config.from_object(Config)

CORS(
    app,
    supports_credentials=True,
    origins=["https://prod.d1k66fuq0oedch.amplifyapp.com", "http://localhost:3000"],
)
Session(app)


for blueprint in vars(routes).values():
    """
    Dynamically parse Blueprint class from routes folder and add corresponding url prefix
    """
    if isinstance(blueprint, Blueprint):
        app.register_blueprint(blueprint, url_prefix=blueprint.url_prefix)


@app.errorhandler(404)
def endpoint_not_found(e):
    """
    Fallback request handler
    """
    return "Endpoint not found.", 404


if __name__ == "__main__":
    app.run(debug=Config.DEBUG, use_reloader=Config.DEBUG)
