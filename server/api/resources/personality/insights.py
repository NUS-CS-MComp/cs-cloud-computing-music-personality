import json

from flask_restful import Resource
from flask_restful.reqparse import Argument
from models.user import User
from services import IBMWatsonService
from utils import parse_params, UserManager


class PersonalityScore(Resource):
    """
    IBM Personality Insights resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Resource using IBM Personality Insights service wrapper
    :rtype: Resource
    """

    @staticmethod
    @UserManager.parse_user_session
    @parse_params(Argument("text_content", location="form", required=True, type=str),)
    def post(user_id, text_content):
        """
        POST endpoint to get personality scores based on user post content

        :param text_content: Concatenated user post content
        :type text_content: list
        """
        try:
            text_content = json.loads(text_content)
        except Exception:
            return "Text content is not valid.", 400
        aggregated_text_raw = " ".join(
            list(map(lambda post: post["message"], text_content))
        )
        service_response = IBMWatsonService.get_personality_scores(aggregated_text_raw)
        formatted_scores = PersonalityScore.parse_scores(
            service_response.data["personality"],
            service_response.data["consumption_preferences"],
        )
        User.update_insights_field(
            user_id,
            {
                User.personality_scores: formatted_scores,
                User.inferred_from_post: text_content,
            },
        )
        return formatted_scores, 200

    @staticmethod
    def parse_scores(personality_scores, consumption_preferences_scores):
        """
        Helper function to parse personality and consumption preference scores

        :param personality_scores: Personality score object
        :type personality_scores: dict
        :param consumption_preferences_scores: Consumption preference score object
        :type consumption_preferences_scores: dict
        :return: Formatted score object
        :rtype: dict
        """
        formatted_result = {}
        for personality_score in personality_scores:
            formatted_result[personality_score["trait_id"]] = personality_score[
                "raw_score"
            ]
        for consumption_score in consumption_preferences_scores:
            for pref in consumption_score["consumption_preferences"]:
                formatted_result[pref["consumption_preference_id"]] = pref["score"]
        return formatted_result
