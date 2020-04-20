import boto3
from config import Config

DB = boto3.resource(
    "dynamodb",
    aws_access_key_id=Config.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=Config.AWS_SECRET_ACCESS_KEY,
    region_name=Config.DYNAMO_REGION,
    endpoint_url=Config.DYNAMO_ENDPOINT,
)
