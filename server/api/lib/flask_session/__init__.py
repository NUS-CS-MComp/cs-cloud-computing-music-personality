# -*- coding: utf-8 -*-
"""
Adds server session support to your application.

:copyright: (c) 2014 by Shipeng Feng. Modified by Terry Lu.
:license: BSD, see LICENSE for more details.
"""

__version__ = "0.3.1"

import os

from lib.flask_session.sessions import NullSessionInterface, RedisSessionInterface


class Session(object):
    def __init__(self, app=None):
        self.app = app
        if app is not None:
            self.init_app(app)

    def init_app(self, app):
        app.session_interface = self._get_interface(app)

    def _get_interface(self, app):
        config = app.config.copy()
        config.setdefault("SESSION_TYPE", "null")
        config.setdefault("SESSION_PERMANENT", True)
        config.setdefault("SESSION_USE_SIGNER", False)
        config.setdefault("SESSION_KEY_PREFIX", "session:")
        config.setdefault("SESSION_REDIS", None)
        config.setdefault("SESSION_MEMCACHED", None)
        config.setdefault(
            "SESSION_FILE_DIR", os.path.join(os.getcwd(), "flask_session")
        )
        config.setdefault("SESSION_FILE_THRESHOLD", 500)
        config.setdefault("SESSION_FILE_MODE", 384)
        config.setdefault("SESSION_MONGODB", None)
        config.setdefault("SESSION_MONGODB_DB", "flask_session")
        config.setdefault("SESSION_MONGODB_COLLECT", "sessions")
        config.setdefault("SESSION_SQLALCHEMY", None)
        config.setdefault("SESSION_SQLALCHEMY_TABLE", "sessions")

        if config["SESSION_TYPE"] == "redis":
            session_interface = RedisSessionInterface(
                config["SESSION_REDIS"],
                config["SESSION_KEY_PREFIX"],
                config["SESSION_USE_SIGNER"],
                config["SESSION_PERMANENT"],
            )
        else:
            session_interface = NullSessionInterface()

        return session_interface
