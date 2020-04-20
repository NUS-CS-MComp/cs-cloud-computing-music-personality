import boto3
from config import Config

DB = boto3.resource(
    "dynamodb", region_name=Config.DYNAMO_REGION, endpoint_url=Config.DYNAMO_ENDPOINT,
)
