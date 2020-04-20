"""
Server-side Sessions and SessionInterfaces.

:copyright: (c) 2014 by Shipeng Feng. Modified by Terry Lu.
:license: BSD, see LICENSE for more details.
"""

import json
import pickle
from itsdangerous import Signer, BadSignature, want_bytes
from uuid import uuid4

from flask.sessions import SessionInterface as FlaskSessionInterface
from flask.sessions import SessionMixin
from werkzeug.datastructures import CallbackDict

text_type = str


def total_seconds(td):
    return td.days * 60 * 60 * 24 + td.seconds


class ServerSideSession(CallbackDict, SessionMixin):
    def __init__(self, initial=None, sid=None, permanent=None):
        def on_update(self):
            self.modified = True

        CallbackDict.__init__(self, initial, on_update)
        self.sid = sid
        if permanent:
            self.permanent = permanent
        self.modified = False


class RedisSession(ServerSideSession):
    pass


class SessionInterface(FlaskSessionInterface):
    def _generate_sid(self):
        return str(uuid4())

    def _get_signer(self, app):
        if not app.secret_key:
            return None
        return Signer(app.secret_key, salt="flask-session", key_derivation="hmac")


class NullSessionInterface(SessionInterface):
    def open_session(self, app, request):
        return None


class RedisSessionInterface(SessionInterface):
    serializer = pickle
    session_class = RedisSession

    def __init__(self, redis, key_prefix, use_signer=False, permanent=True):
        if redis is None:
            from redis import Redis

            redis = Redis()
        self.redis = redis
        self.key_prefix = key_prefix
        self.use_signer = use_signer
        self.permanent = permanent

    def open_session(self, app, request):
        sid = request.cookies.get(app.session_cookie_name)
        if not sid:
            sid = self._generate_sid()
            return self.session_class(sid=sid, permanent=self.permanent)
        if self.use_signer:
            signer = self._get_signer(app)
            if signer is None:
                return None
            try:
                sid_as_bytes = signer.unsign(sid)
                sid = sid_as_bytes.decode()
            except BadSignature:
                sid = self._generate_sid()
                return self.session_class(sid=sid, permanent=self.permanent)

        if not isinstance(sid, text_type):
            sid = sid.decode("utf-8", "strict")
        val = self.redis.get(self.key_prefix + sid)
        if val is not None:
            try:
                data = self.serializer.loads(val)
                return self.session_class(data, sid=sid)
            except Exception:
                return self.session_class(sid=sid, permanent=self.permanent)
        return self.session_class(sid=sid, permanent=self.permanent)

    def save_session(self, app, session, response):
        domain = self.get_cookie_domain(app)
        path = self.get_cookie_path(app)
        if not session:
            if session.modified:
                self.redis.delete(self.key_prefix + session.sid)
                response.delete_cookie(
                    app.session_cookie_name, domain=domain, path=path
                )
            return

        """
        IMPORTANT LINE HERE.

        Cookies are configured to be set only on modified session.
        """
        should_set_cookie = self.should_set_cookie(app, session)
        if isinstance(should_set_cookie, str):
            try:
                should_set_cookie = json.loads(should_set_cookie.lower())
            except json.JSONDecodeError:
                pass
        if not should_set_cookie:
            return

        httponly = self.get_cookie_httponly(app)
        secure = self.get_cookie_secure(app)
        expires = self.get_expiration_time(app, session)
        val = self.serializer.dumps(dict(session))
        self.redis.setex(
            name=self.key_prefix + session.sid,
            value=val,
            time=total_seconds(app.permanent_session_lifetime),
        )
        if self.use_signer:
            session_id = self._get_signer(app).sign(want_bytes(session.sid))
        else:
            session_id = session.sid
        response.set_cookie(
            app.session_cookie_name,
            session_id,
            expires=expires,
            max_age=60 * 60 * 24 * 7,
            httponly=httponly,
            domain=domain,
            path=path,
            secure=secure,
            samesite="None",
        )
