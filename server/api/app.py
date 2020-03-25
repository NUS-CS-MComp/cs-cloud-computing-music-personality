"""
Main thread code for server application
"""

from flask import Flask
from flask.blueprints import Blueprint

import config
import routes

# from models import db

app = Flask(__name__, root_path=config.APPLICATION_ROOT)

app.debug = config.DEBUG
# app.config["SQLALCHEMY_DATABASE_URI"] = config.DB_URI
# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = config.SQLALCHEMY_TRACK_MODIFICATIONS
# db.init_app(app)
# db.app = app

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
    return "Endpoint not found."


if __name__ == "__main__":
    app.run(host=config.HOST, port=config.PORT)
