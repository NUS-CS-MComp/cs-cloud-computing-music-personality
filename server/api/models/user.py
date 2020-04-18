from .base import BaseModel
from .social_connect import SocialConnect


class UserModel(BaseModel):
    """
    User data model

    :param BaseModel: Inherit from base data model
    :type BaseModel: BaseModel
    :return: User data model object
    :rtype: UserModel
    """

    def create(self, provider, profile_info, **kwargs):
        """
        Create user profile by provider and provider profile

        :param provider: Provider name
        :type provider: str
        :param profile_info: Profile information
        :type profile_info: dict
        :return: Database response object
        :rtype: dict
        """
        user_data = super().create(
            {
                self.insights_key: {
                    self.personality_scores: None,
                    self.inferred_from_post: None,
                    self.cluster_assignment: None,
                    self.inferred_from_track: None,
                },
                self.profile_key: {self.user_name: None, self.short_bio: None},
                self.provider_key: {provider: profile_info},
                **kwargs,
            },
        )
        SocialConnect.create(provider, profile_info["id"], user_data[self.id_key])
        return user_data

    def find(self, provider, profile_id, profile_id_key="id"):
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
        data = SocialConnect.get(provider, profile_id)
        if data is not None:
            return self.get(data["user_id"])
        else:
            return data

    def update_sid(self, user_id, sid):
        """
        Update user data by nwe session ID

        :param user_id: User ID
        :type user_id: str
        :param sid: Session ID
        :type sid: str
        :return: Database response object
        :rtype: dict
        """
        return super().update(user_id, {f"sid": sid})

    def update(self, user_id, provider, profile_info):
        """
        Update user data by new provider profile

        :param user_id: User ID
        :type user_id: str
        :param provider: Provider name
        :type provider: str
        :param profile_info: Profile information
        :type profile_info: dict
        :return: Database response object
        :rtype: dict
        """
        try:
            providers_data = self.get(user_id)[self.provider_key]
            super().update(user_id, {f"{self.provider_key}.{provider}": profile_info})
            if provider in providers_data:
                old_profile_info = providers_data[provider]
                old_profile_id = old_profile_info["id"]
                SocialConnect.delete(provider, old_profile_id)
            new_profile_id = profile_info["id"]
            SocialConnect.create(provider, new_profile_id, user_id)
        except KeyError:
            pass

    def update_profile_info(self, user_id, **kwargs):
        """
        Update user data by given user information

        :param user_id: User ID
        :type user_id: str
        :param user_info: User information in key-value pairs
        :type user_info: dict
        """
        try:
            update_map = {}
            for field_name in kwargs.keys():
                if kwargs[field_name] is not None:
                    update_map[f"{self.profile_key}.{field_name}"] = kwargs[field_name]
            super().update(user_id, update_map)
        except Exception as e:
            print(f" ! Error occurred when updating user profile.")
            raise e

    def update_insights_field(self, user_id, insight_field_map):
        """
        Update insights data field

        :param user_id: User ID
        :type user_id: str
        :param insight_field_map: Field key-value pair
        :type insight_field: dict
        """
        update_map = {}
        for field_name in insight_field_map.keys():
            if field_name not in [
                self.personality_scores,
                self.cluster_assignment,
                self.inferred_from_post,
                self.inferred_from_track,
            ]:
                continue
            update_map[f"{self.insights_key}.{field_name}"] = insight_field_map[
                field_name
            ]
        if len(update_map) > 0:
            super().update(user_id, update_map, True)

    def delete(self, user_id):
        """
        Delete user instance and related connections

        :param user_id: User ID
        :type user_id: str
        """
        providers_data = self.get(user_id)[self.provider_key]
        for provider in providers_data.keys():
            profile_id = providers_data[provider]["id"]
            SocialConnect.delete(provider, profile_id)
        super().delete(user_id)

    def delete_provider(self, user_id, provider):
        """
        Remove provider profile from user profile

        :param user_id: User ID
        :type user_id: str
        :param provider: Provider name
        :type provider: str
        :return: Provider data after deletion
        :rtype: dict
        """
        try:
            providers_data = self.get(user_id)[self.provider_key]
            provider_info = providers_data[provider]
            super().remove_field(user_id, f"{self.provider_key}.{provider}")
            SocialConnect.delete(provider, provider_info["id"])
            if provider in providers_data and len(providers_data) == 1:
                self.delete(user_id)
            del providers_data[provider]
            return providers_data
        except KeyError:
            pass

    def scan_by_cluster_group(self, cluster_group):
        """
        Get all users by cluster group

        :param cluster_group: Cluster group assignment tag
        :type cluster_group: str
        """
        pass

    @property
    def table_name(self):
        return "User"

    @property
    def id_key(self):
        return "user_id"

    @property
    def insights_key(self):
        return "insights"

    @property
    def profile_key(self):
        return "profile"

    @property
    def provider_key(self):
        return "provider"

    @property
    def personality_scores(self):
        return "personality_scores"

    @property
    def inferred_from_post(self):
        return "inferred_from_post"

    @property
    def inferred_from_track(self):
        return "inferred_from_track"

    @property
    def cluster_assignment(self):
        return "cluster_assignment"

    @property
    def user_name(self):
        return "user_name"

    @property
    def short_bio(self):
        return "short_bio"


User = UserModel()
