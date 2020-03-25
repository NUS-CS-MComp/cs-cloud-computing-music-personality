import logging
import os

from dotenv import load_dotenv
from pathlib import Path

DEBUG = os.getenv("ENVIRONEMENT") == "DEV"

LOCAL_ENV_PATH = Path(".") / ".env.local"
if load_dotenv(LOCAL_ENV_PATH) and Path.is_file(LOCAL_ENV_PATH):
    print(" * Loading local environment variables in .env.local")
else:
    print(" ! .env.local is missing for development mode")

APPLICATION_ROOT = os.getenv("APPLICATION_APPLICATION_ROOT", "/")
HOST = os.getenv("APPLICATION_HOST", "localhost")
PORT = int(os.getenv("APPLICATION_PORT", "5000"))
SQLALCHEMY_TRACK_MODIFICATIONS = False

DB_CONTAINER = os.getenv("APPLICATION_DB_CONTAINER", "db")
POSTGRES = {
    "user": os.getenv("APPLICATION_POSTGRES_USER", "postgres"),
    "pw": os.getenv("APPLICATION_POSTGRES_PW", ""),
    "host": os.getenv("APPLICATION_POSTGRES_HOST", DB_CONTAINER),
    "port": os.getenv("APPLICATION_POSTGRES_PORT", 5432),
    "db": os.getenv("APPLICATION_POSTGRES_DB", "postgres"),
}
DB_URI = "postgresql://%(user)s:%(pw)s@%(host)s:%(port)s/%(db)s" % POSTGRES

logging.basicConfig(
    filename=os.getenv("SERVICE_LOG", f"{os.path.dirname(__file__)}/server.log"),
    level=logging.DEBUG,
    format="%(levelname)s: %(asctime)s \
        pid:%(process)s module:%(module)s %(message)s",
    datefmt="%d/%m/%y %H:%M:%S",
)
