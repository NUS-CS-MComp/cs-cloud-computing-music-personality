import decimal
import json
import time
import uuid
from datetime import datetime

from .db import DB
from boto3.dynamodb.conditions import Attr
from boto3.dynamodb.types import Binary


class Encoder(json.JSONEncoder):
    """
    Helper class to convert a DynamoDB item to JSON

    From https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.Python.03.html#GettingStarted.Python.03.02
    """

    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        if isinstance(o, Binary):
            return o.value.decode("utf-8")
        return super(Encoder, self).default(o)


class BaseModel:
    """
    Base model to interact with DynamoDB instance

    :return: Base model object
    :rtype: BaseModel
    """

    def __init__(self):
        self.table = DB.Table(self.table_name)

    def create(self, item):
        """
        Create an item

        :param item: Item data
        :type item: dict
        :return: Database response object
        :rtype: dict
        """
        item[self.id_key] = str(uuid.uuid4())
        item["created_at"] = int(time.mktime(datetime.now().timetuple()))
        self.table.put_item(Item=item)
        return item

    def get(self, id, use_json=False):
        """
        Get an item

        :param id: ID tag
        :type id: str
        :param use_json: Boolean flag to transform to standard JSON data
        :type id: bool
        :return: Database response object
        :rtype: dict
        """
        try:
            item = self.table.get_item(Key={self.id_key: id})["Item"]
            if use_json:
                return json.loads(json.dumps(item, cls=Encoder))
            else:
                return item
        except KeyError:
            return None

    def remove_field(self, item_id, field_string):
        """
        Remove a filed from an item

        :param id: ID tag
        :type id: str
        :param field_string: Field path string
        :type field_string: str
        :return: Database response object
        :rtype: dict
        """
        return self.table.update_item(
            Key={self.id_key: item_id}, UpdateExpression=f"remove {field_string}",
        )

    def update(self, item_id, update_fields, encode_string=False):
        """
        Update an item

        :param id: ID tag
        :type id: str
        :param update_fields: Field key-value pair mapping
        :type update_fields: dict
        :return: Database response object
        :rtype: dict
        """

        def transform_data(original_data):
            """
            Helper function to recursively convert float data to Decimal class

            :param update_data: Data to be updated
            :type update_data: dict
            :return: New data format
            :rtype: any
            """
            if isinstance(original_data, float):
                return decimal.Decimal(str(original_data))
            if isinstance(original_data, dict):
                new_update_data = {}
                for key in original_data.keys():
                    new_update_data[key] = transform_data(original_data[key])
                return new_update_data
            if isinstance(original_data, list):
                return list(map(lambda data: transform_data(data), original_data))
            if encode_string and isinstance(original_data, str):
                return original_data.encode("utf-8")
            return original_data

        update_string = ", ".join(
            [
                f"{key_name}=:val{index}"
                for index, key_name in enumerate(update_fields.keys())
            ]
        )
        update_value_map = {
            f":val{index}": transform_data(update_fields[key_name])
            for index, key_name in enumerate(update_fields.keys())
        }
        return self.table.update_item(
            Key={self.id_key: item_id},
            UpdateExpression=f"set {update_string}",
            ExpressionAttributeValues=update_value_map,
        )

    def query(self, use_json=False, field_attributes={}, **kwargs):
        """
        Query an item by field attributes

        :param field_attributes: Field attribute-value mapping
        :type field_attributes: dict
        :return: Database response object
        :rtype: dict
        """
        expression = None
        for attr in field_attributes.keys():
            if expression is None:
                expression = Attr(attr).eq(field_attributes[attr])
            else:
                expression = expression & Attr(attr).eq(field_attributes[attr])
        if expression is not None:
            kwargs.update({"FilterExpression": expression})
        try:
            items = self.table.query(**kwargs)["Items"]
            if use_json:
                return json.loads(json.dumps(items, cls=Encoder))
            else:
                return items
        except KeyError:
            return []

    def scan(self, use_json=False, **kwargs):
        """
        Scan through the entire table

        :return: Database response object
        :rtype: dict
        """
        try:
            items = self.table.scan(**kwargs)["Items"]
            if use_json:
                return json.loads(json.dumps(items, cls=Encoder))
            else:
                return items
        except KeyError:
            return []

    def delete(self, item_id):
        """
        Delete an item

        :param id: ID tag
        :type id: str
        :return: Database response object
        :rtype: dict
        """
        return self.table.delete_item(Key={self.id_key: item_id})

    @property
    def global_secondary_index(self):
        if not self.secondary_key:
            return None
        return f"{self.secondary_key}_index"

    @property
    def table_name(self):
        raise NotImplementedError("Table name property not implemented.")

    @property
    def id_key(self):
        return "id"

    @property
    def secondary_key(self):
        return None
