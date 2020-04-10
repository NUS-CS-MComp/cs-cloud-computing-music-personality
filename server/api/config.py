"""
Application configuration variables
"""

import logging
import os
import redis

from dotenv import load_dotenv
from pathlib import Path


class Config:
    """
    Application general configuration
    """

    DEBUG = os.getenv("ENVIRONMENT") == "DEV"

    # Load local environment variables if any, which ends with .local suffix
    LOCAL_ENV_PATH = Path(".") / ".env.local"
    if load_dotenv(LOCAL_ENV_PATH) and Path.is_file(LOCAL_ENV_PATH):
        print(" * Loading local environment variables in .env.local")
    else:
        print(" ! .env.local is missing for development mode")

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

    # AWS
    AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")

    # DynamoDB
    DYNAMO_ENDPOINT = os.getenv("DYNAMO_ENDPOINT")
    DYNAMO_REGION = os.getenv("DYNAMO_REGION")
