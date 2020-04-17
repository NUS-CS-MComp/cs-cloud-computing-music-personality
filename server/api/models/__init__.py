import boto3

from config import Config

DB = boto3.resource(
    "dynamodb",
    aws_access_key_id=Config.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=Config.AWS_SECRET_ACCESS_KEY,
    region_name=Config.DYNAMO_REGION,
    endpoint_url=Config.DYNAMO_ENDPOINT,
)

TABLES = [
    {"name": "User", "key_id": "user_id"},
    {"name": "SocialConnect", "key_id": "provider_profile_id"},
    {"name": "Personality", "key_id": "user_id"},
]


def create_table_non_exist(tables, delete_original=True):
    """
    Helper function to create table based on table status

    :param tables: List of table objects
    :type tables: list
    :param delete_original: Boolean flag to delete original table
    :type tables: boolean
    """
    existing_tables = [table.name for table in DB.tables.all()]
    for table in tables:
        table_name = table["name"]
        if table_name in existing_tables:
            print(f" * Use existing table {table_name} on local DynamoDB instance")
            if not delete_original:
                continue
            DB.Table(table_name).delete()

        table_key_id = table["key_id"]
        DB.create_table(
            TableName=table_name,
            KeySchema=[
                {"AttributeName": table_key_id, "KeyType": "HASH"}
            ],  # Partition key
            AttributeDefinitions=[
                {"AttributeName": table_key_id, "AttributeType": "S"}
            ],
            ProvisionedThroughput={"ReadCapacityUnits": 10, "WriteCapacityUnits": 10},
        )
        print(f" * Created table {table} on local DynamoDB instance")


if Config.DEBUG:
    create_table_non_exist(TABLES, False)
