"""
Request helper for generic request and OAuth related request

Some lines are referenced from https://github.com/oauthlib/oauthlib
"""
import binascii
import hmac
import secrets
import time

from hashlib import sha1
from urllib.parse import quote


def construct_auth_bearer(token):
    """
    Helper function to construct authorization bearer header data

    :param token: Token string
    :type token: str
    :return: Authorization header dictionary object with Bearer data
    :rtype: dict
    """
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
    """
    Helper function to construct authorization OAuth header data for OAuth 1.0

    :param url: Base URL for related resources
    :type url: str
    :param method: HTTP method string
    :type method: str
    :param consumer_key: Consumer token key
    :type consumer_key: str
    :param consumer_secret: Consumer token secret
    :type consumer_secret: str
    :param token_key: Resource owner token key, defaults to None
    :type token_key: str, optional
    :param token_secret: Resource owner token secret, defaults to None
    :type token_secret: str, optional
    :return: Authorization header dictionary object with OAuth data
    :rtype: dict
    """

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

    key_values = [
        (percent_encode(k), percent_encode(v)) for k, v in base_parameters.items()
    ]
    key_values.sort()
    parameter_parts = [f"{k}={v}" for k, v in key_values]

    base_string = ""
    base_string += percent_encode(method.upper())
    base_string += "&"
    base_string += percent_encode(url)
    base_string += "&"
    base_string += percent_encode("&".join(parameter_parts))

    key = percent_encode(consumer_secret or "")
    key += "&"
    key += percent_encode(token_secret or "")

    signature = hmac.new(key.encode("utf-8"), base_string.encode("utf-8"), sha1,)
    signature_decode = binascii.b2a_base64(signature.digest())[:-1].decode("utf-8")
    base_parameters["oauth_signature"] = signature_decode

    oauth_string = "OAuth "
    new_key_values = [
        (percent_encode(k), percent_encode(v)) for k, v in base_parameters.items()
    ]
    parameter_parts = [f'{k}="{v}"' for k, v in new_key_values]
    oauth_string += ", ".join(parameter_parts)

    return {"Authorization": oauth_string}


def construct_user_agent():
    """
    Helper function to construct meaningful user agent data

    :return: Dictionary object containing user agent data
    :rtype: dict
    """
    return {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"
    }


def percent_encode(string):
    """
    Helper function to percent encode a given string

    :param string: String data for percent encoding
    :type string: str
    :raises ValueError: Error object on event of non-unicode object
    :return: Percent-encoded string
    :rtype: str
    """
    if not isinstance(string, str):
        raise ValueError(
            "Only unicode objects are escapable. "
            + "Got {!r} of type {}.".format(string, type(string))
        )
    return quote(string, safe=b"~")
