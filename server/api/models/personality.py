from .base import BaseModel
from decimal import *


class PersonalityModel(BaseModel):
    """
    Social connect index-referencing model

    :param BaseModel: Inherit from base data model
    :type BaseModel: BaseModel
    :return: Personality index-referencing model object
    :rtype: PersonalityModel
    """

    def create(self, user_id, personality_score, consumption_preferences_score):
        """
        Create entry in personality insights table

        :param user_id: User ID
        :type user_id: str
        :param personality_score: Big 5 personality scores
        :type personality_score: array
        :param consumption_preferences_score: Consumption preferences scores
        :type consumption_preferences_score: array
        :return: Database response object
        :rtype: dict
        """
        item = self.parse_scores(personality_score, consumption_preferences_score)
        item[self.id_key] = PersonalityModel.compose_key(user_id)
        return self.table.put_item(Item=item)

    @property
    def table_name(self):
        return "Personality"

    @property
    def id_key(self):
        return "user_id"

    @staticmethod
    def compose_key(user_id):
        return f"{user_id}"

    @staticmethod
    def parse_scores(personality_score, consumption_preferences_score):
        parsed = {}
        for p in personality_score:
            parsed[p['trait_id']] = Decimal(str(p['raw_score']))
        for cps in consumption_preferences_score:
            for cp in cps['consumption_preferences']:
                parsed[cp['consumption_preference_id']] = Decimal(str(cp['score']))
        return parsed


Personality = PersonalityModel()
