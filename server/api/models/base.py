import uuid
from datetime import datetime

from . import DB
from boto3.dynamodb.conditions import Attr


class BaseModel:
    """
    Base model to interact with DynamoDB instance

    :return: Base model object
    :rtype: BaseModel
    """

    def __init__(self):
        self.table = DB.table(self.table_name)

    def create(self, item):
        """
        Create an item

        :param item: Item data
        :type item: dict
        :return: Database response object
        :rtype: dict
        """
        item[self.id_key] = uuid.uuid4()
        item["created_at"] = datetime.utcnow().timestamp() * 1000
        return self.table.table.put_item(Item=item)

    def get(self, id):
        """
        Get an item

        :param id: ID tag
        :type id: str
        :return: Database response object
        :rtype: dict
        """
        return self.table.get_item(Key={self.id_key: id})

    def update(self, id, update_fields):
        """
        Update an item

        :param id: ID tag
        :type id: str
        :param update_fields: Field key-value pair mapping
        :type update_fields: dict
        :return: Database response object
        :rtype: dict
        """
        update_string = ", ".join(
            [
                f"{key_name}=:val{index}"
                for index, key_name in enumerate(update_fields.keys())
            ]
        )
        update_value_map = {
            f"val{index}": update_fields[key_name]
            for index, key_name in enumerate(update_fields.keys())
        }
        return self.table.update_item(
            Key={self.id_key: id},
            UpdateExpression=f"set {update_string}",
            ExpressionAttributeValues=update_value_map,
        )

    def query(self, field_attributes):
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
        return self.table.query(FilterExpression=expression)

    def delete(self, id):
        """
        Delete an item

        :param id: ID tag
        :type id: str
        :return: Database response object
        :rtype: dict
        """
        return self.table.delete_item(Key={self.id_key: id})

    @property
    def table_name(self):
        raise NotImplementedError("Table name property not implemented.")

    @property
    def id_key(self):
        return "id"
