from .base import BaseModel
from boto3.dynamodb.conditions import Key


class InferenceGroupModel(BaseModel):
    """
    Inference user group index-referencing model

    :param BaseModel: Inherit from base data model
    :type BaseModel: BaseModel
    :return: Inference user group index-referencing model object
    :rtype: InferenceGroupModel
    """

    def create(self, user_id, cluster_group):
        """
        Create new inference instance

        :param user_id: User ID tag
        :type user_id: str
        :param cluster_group: Cluster group id
        :type cluster_group:: str
        :return: Database response object
        :rtype: dict
        """
        item = {"cluster_group": cluster_group, "user_id": user_id}
        return self.table.put_item(Item=item)

    def get(self, user_id):
        """
        Find inference data by user ID

        :param user_id: User ID tag
        :type user_id: str
        :return: Database response object
        :rtype: dict
        """
        result = super().query(KeyConditionExpression=Key(self.id_key).eq(user_id))
        try:
            return result.pop()
        except IndexError:
            return None

    def get_by_cluster(self, cluster_group):
        """
        Find inference data by cluster group

        :param cluster_group: Cluster group name
        :type cluster_group: str
        :return: Database response object
        :rtype: dict
        """
        result = super().query(
            True,
            IndexName=self.global_secondary_index,
            KeyConditionExpression=Key(self.secondary_key).eq(
                str(float(cluster_group))
            ),
        )
        return result

    def update(self, user_id, cluster_group):
        """
        Update user ID for inference data

        :param user_id: User ID tag
        :type user_id: str
        :param cluster_group: Cluster group id
        :type cluster_group:: str
        :return: Database response object
        :rtype: dict
        """
        if not self.get(user_id):
            return self.create(user_id, cluster_group)
        super().delete(user_id)
        return self.create(user_id, cluster_group)

    @property
    def table_name(self):
        return "InferenceGroup"

    @property
    def id_key(self):
        return "user_id"

    @property
    def secondary_key(self):
        return "cluster_group"


InferenceGroup = InferenceGroupModel()
