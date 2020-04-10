from datetime import datetime

from .base import BaseModel


class SocialConnectModel(BaseModel):
    """
    Social connect index-referencing model

    :param BaseModel: Inherit from base data model
    :type BaseModel: BaseModel
    :return: Social connect index-referencing model object
    :rtype: SocialConnectModel
    """

    def create(self, provider, profile_id, user_id):
        """
        Create social media account connetion

        :param provider: Provider name
        :type provider: str
        :param profile_id: Profile ID tag
        :type profile_id: str
        :param user_id: User ID tag
        :type user_id: str
        :return: Database response object
        :rtype: dict
        """
        item = {"provider": provider, "user_id": user_id}
        item[self.id_key] = SocialConnectModel.compose_key(provider, profile_id)
        item["connected_at"] = int(datetime.utcnow().timestamp() * 1000)
        return self.table.put_item(Item=item)

    def get(self, provider, profile_id):
        """
        Find connection data by provider profile id

        :param profile_id: Profile ID specific to the provider
        :type profile_id: str
        :return: Database response object
        :rtype: dict
        """
        return super().get(SocialConnectModel.compose_key(provider, profile_id))

    def update(self, provider, profile_id, user_id):
        """
        Update user ID for connection data

        :param provider: Provider name
        :type provider: str
        :param profile_id: Profile ID tag
        :type profile_id: str
        :param user_id: User ID
        :type user_id: str
        :return: Database response object
        :rtype: dict
        """
        item = {"user_id": user_id}
        item["connected_at"] = int(datetime.utcnow().timestamp() * 1000)
        return super().update(SocialConnect.compose_key(provider, profile_id), item)

    def delete(self, provider, profile_id):
        """
        Delete social connection record

        :param provider: Provider name
        :type provider: str
        :param profile_id: Profile ID tag
        :type profile_id: str
        :return: Database response object
        :rtype: dict
        """
        return super().delete(SocialConnect.compose_key(provider, profile_id))

    @property
    def table_name(self):
        return "SocialConnect"

    @property
    def id_key(self):
        return "provider_profile_id"

    @staticmethod
    def compose_key(provider, provider_profile_id):
        return f"{provider}_{provider_profile_id}"


SocialConnect = SocialConnectModel()
