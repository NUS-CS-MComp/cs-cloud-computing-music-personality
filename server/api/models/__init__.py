import decimal
import json
import os
from typing import List

from models.db import DB
from models.base import BaseModel
from models.generator import UserGenerator
from models.user import User
from models.social_connect import SocialConnect
from models.inference_group import InferenceGroup

INCLUDE_MODELS = [User, SocialConnect, InferenceGroup]
LOAD_FILES = {User.table_name: "user.json", InferenceGroup.table_name: "inference.json"}


def create_table_non_exist(models: List[BaseModel], delete_original=True):
    """
    Helper function to create table based on table status

    :param tables: List of model objects
    :type tables: list
    :param delete_original: Boolean flag to delete original table
    :type tables: boolean
    """
    existing_tables = [table.name for table in DB.tables.all()]
    for model in models:
        table_name = model.table_name

        if table_name in existing_tables:
            print(f" * Use existing table {table_name} on DynamoDB instance")
            if not delete_original:
                continue
            else:
                DB.Table(table_name).delete()

        table_key_id = model.id_key
        table_secondary_key = model.secondary_key
        table_creation_kwargs = {
            "TableName": table_name,
            "KeySchema": [{"AttributeName": table_key_id, "KeyType": "HASH"}],
            "AttributeDefinitions": [
                {"AttributeName": table_key_id, "AttributeType": "S"}
            ],
            "ProvisionedThroughput": {
                "ReadCapacityUnits": 10,
                "WriteCapacityUnits": 10,
            },
        }
        if table_secondary_key is not None:
            table_creation_kwargs["GlobalSecondaryIndexes"] = [
                {
                    "IndexName": model.global_secondary_index,
                    "KeySchema": [
                        {"AttributeName": table_secondary_key, "KeyType": "HASH"},
                    ],
                    "Projection": {"ProjectionType": "ALL"},
                    "ProvisionedThroughput": {
                        "ReadCapacityUnits": 10,
                        "WriteCapacityUnits": 5,
                    },
                }
            ]
            table_creation_kwargs["AttributeDefinitions"].append(
                {"AttributeName": table_secondary_key, "AttributeType": "S"}
            )

        new_table = DB.create_table(**table_creation_kwargs)
        new_table.meta.client.get_waiter("table_exists").wait(TableName=table_name)
        print(f" * Created table {table_name} on DynamoDB instance")

        if table_name in LOAD_FILES:
            table = DB.Table(table_name)
            file_path = (
                f"{os.path.dirname(__file__)}/generator/{LOAD_FILES[table_name]}"
            )

            if not os.path.isfile(file_path):
                print(f" * Generating preloaded data for table {table_name}")
                UserGenerator.generate()

            with open(file_path) as json_file:
                records = json.load(json_file, parse_float=decimal.Decimal)
                for record in records:
                    table.put_item(Item=record)

            print(f" * Added preloaded data in table {table_name}")


# UserGenerator.generate()
create_table_non_exist(INCLUDE_MODELS, False)
