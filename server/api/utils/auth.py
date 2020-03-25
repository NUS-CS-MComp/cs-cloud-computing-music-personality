import binascii
import hmac
import secrets
import time

from hashlib import sha1
from urllib.parse import quote


def construct_auth_bearer(token):
    return {"Authorization": f"Bearer {token}"}


def construct_auth_oauth1(
    url,
    method,
    consumer_key,
    consumer_secret,
    token_key=None,
    token_secret=None,
    **kwargs,
):
    def escape(u):
        if not isinstance(u, str):
            raise ValueError(
                "Only unicode objects are escapable. "
                + "Got {!r} of type {}.".format(u, type(u))
            )
        return quote(u, safe=b"~")

    def generate_nonce(bytes=16):
        return secrets.token_urlsafe(bytes)

    def generate_timestamp():
        return str(int(time.time()))

    base_parameters = {
        "oauth_consumer_key": consumer_key,
        "oauth_nonce": generate_nonce(),
        "oauth_signature_method": "HMAC-SHA1",
        "oauth_timestamp": generate_timestamp(),
        "oauth_version": "1.0",
    }
    if token_key is not None:
        base_parameters["oauth_token"] = token_key
    if kwargs is not None:
        base_parameters.update(kwargs)

    key_values = [(escape(k), escape(v)) for k, v in base_parameters.items()]
    key_values.sort()
    parameter_parts = [f"{k}={v}" for k, v in key_values]

    base_string = ""
    base_string += escape(method.upper())
    base_string += "&"
    base_string += escape(url)
    base_string += "&"
    base_string += escape("&".join(parameter_parts))

    key = escape(consumer_secret or "")
    key += "&"
    key += escape(token_secret or "")

    signature = hmac.new(key.encode("utf-8"), base_string.encode("utf-8"), sha1,)
    signature_decode = binascii.b2a_base64(signature.digest())[:-1].decode("utf-8")
    base_parameters["oauth_signature"] = signature_decode

    oauth_string = "OAuth "
    new_key_values = [(escape(k), escape(v)) for k, v in base_parameters.items()]
    parameter_parts = [f'{k}="{v}"' for k, v in new_key_values]
    oauth_string += ", ".join(parameter_parts)

    return {"Authorization": oauth_string}
