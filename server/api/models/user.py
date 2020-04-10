from .base import BaseModel


class UserModel(BaseModel):
    """
    User data model

    :param BaseModel: Inherit from base data model
    :type BaseModel: BaseModel
    :return: User data model object
    :rtype: UserModel
    """

    def create_by_provider(self, provider, profile_info):
        """
        Create user profile by provider and provider profile

        :param provider: Provider name
        :type provider: str
        :param profile_info: Profile information
        :type profile_info: dict
        :return: Database response object
        :rtype: dict
        """
        return self.create({self.provider_key: {provider: profile_info}})

    def find_by_provider(self, provider, profile_id, profile_id_key="id"):
        """
        Find user by provider profile id

        :param provider: Provider name
        :type provider: str
        :param profile_id: Profile ID specific to the provider
        :type profile_id: str
        :param profile_id_key: Profile ID key, defaults to "id"
        :type profile_id_key: str, optional
        :return: Database response object
        :rtype: dict
        """
        return self.query(
            {f"{self.provider_key}.{provider}.{profile_id_key}": profile_id}
        )

    def update_by_provider(self, id, provider, profile_info):
        """
        Update user profile by nwe provider profile

        :param id: User ID
        :type id: str
        :param provider: Provider name
        :type provider: str
        :param profile_info: Profile information
        :type profile_info: dict
        :return: Database response object
        :rtype: dict
        """
        return self.update(id, {f"{self.provider_key}.{provider}": profile_info})

    def delete_by_provider(self, provider):
        """
        Remove provider profile from user profile

        :param provider: Provider name
        :type provider: str
        :return: Database response object
        :rtype: dict
        """
        return self.update(id, {f"{self.provider_key}.{provider}": {}})

    @property
    def table_name(self):
        return "User"

    @property
    def id_key(self):
        return "user_id"

    @property
    def provider_key(self):
        return "provider"
