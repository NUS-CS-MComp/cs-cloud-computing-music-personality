import boto3

from config import Config

DB = boto3.resource(
    "dynamodb",
    aws_access_key_id=Config.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=Config.AWS_SECRET_ACCESS_KEY,
    region_name=Config.DYNAMO_REGION,
    endpoint_url=Config.DYNAMO_ENDPOINT,
)

TABLES = ["Users"]


def create_table_non_exist(table_names):
    """
    Helper function to create table based on table status

    :param table_name: List of table names
    :type table_name: str
    """
    existing_tables = [table.name for table in DB.tables.all()]
    for table_name in table_names:
        if table_name not in existing_tables:
            response = DB.create_table(
                TableName="Users",
                KeySchema=[
                    {"AttributeName": "user_id", "KeyType": "HASH"}
                ],  # Partition key
                AttributeDefinitions=[
                    {"AttributeName": "user_id", "AttributeType": "S"}
                ],
                ProvisionedThroughput={
                    "ReadCapacityUnits": 10,
                    "WriteCapacityUnits": 10,
                },
            )
            print(response)
            print(f" * Created table {table_name} on local DynamoDB instance")
        else:
            print(f" * Use existing table {table_name} on local DynamoDB instance")


if Config.DEBUG:
    create_table_non_exist(TABLES)
