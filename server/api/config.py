"""
Application configuration variables
"""

import logging
import os
import redis

from dotenv import load_dotenv


class Config:
    """
    Application general configuration
    """

    # Load local environment variables if any, which ends with .local suffix
    LOCAL_ENV_PATH = os.path.abspath(
        os.path.join(os.path.dirname(__file__), ".env.local")
    )
    if os.path.isfile(LOCAL_ENV_PATH) and load_dotenv(LOCAL_ENV_PATH):
        print(" * Loading local environment variables in .env.local")
    else:
        raise FileNotFoundError(" ! .env.local is missing for development mode")

    ENV = os.getenv("ENVIRONMENT")
    DEBUG = ENV == "DEV"
    SUB_ENV_PATH = os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),
            ".env.development.local" if DEBUG else ".env.production.local",
        )
    )
    FLASK_ENV = "development" if DEBUG else "production"
    if os.path.isfile(SUB_ENV_PATH) and load_dotenv(SUB_ENV_PATH):
        print(f" * Loading environment variables from {SUB_ENV_PATH}")
    else:
        raise FileNotFoundError(f" ! {SUB_ENV_PATH} is missing for {ENV} mode")

    # Application
    APPLICATION_ROOT = os.getenv("APPLICATION_APPLICATION_ROOT", "/")
    HOST = os.getenv("APPLICATION_HOST", "localhost")
    PORT = int(os.getenv("APPLICATION_PORT", "5000"))

    logging.basicConfig(
        filename=os.getenv("SERVICE_LOG", f"{os.path.dirname(__file__)}/server.log"),
        level=logging.DEBUG,
        format="%(levelname)s: %(asctime)s \
            pid:%(process)s module:%(module)s %(message)s",
        datefmt="%d/%m/%y %H:%M:%S",
    )

    # Flask-Session
    SECRET_KEY = os.urandom(64)
    PERMANENT_SESSION_LIFETIME = 60 * 60 * 24 * 7

    # Redis
    SESSION_TYPE = os.getenv("SESSION_TYPE")
    SESSION_REDIS = redis.from_url(os.getenv("SESSION_REDIS"))
    SESSION_COOKIE_NAME = os.getenv("SESSION_COOKIE_NAME")
    SESSION_KEY_PREFIX = os.getenv("SESSION_KEY_PREFIX")
    SESSION_REFRESH_EACH_REQUEST = os.getenv("SESSION_REFRESH_EACH_REQUEST")
    SESSION_COOKIE_SECURE = os.getenv("SESSION_COOKIE_SECURE")
    SESSION_COOKIE_DOMAIN = os.getenv("SESSION_COOKIE_DOMAIN")

    # AWS
    AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID", "fake_id")
    AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY", "fake_key")

    # DynamoDB
    DYNAMO_ENDPOINT = os.getenv("DYNAMO_ENDPOINT")
    DYNAMO_REGION = os.getenv("DYNAMO_REGION")
