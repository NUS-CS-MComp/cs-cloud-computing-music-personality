import json
import random

from flask_restful import Resource
from flask_restful.reqparse import Argument
from models.inference_group import InferenceGroup
from models.user import User
from services import SagamakerService
from utils import parse_params, UserManager


AUDIO_FEATURES_KEY_ORDER = [
    "instrumentalness",
    "liveness",
    "speechiness",
    "danceability",
    "valence",
    "loudness",
    "tempo",
    "acousticness",
    "energy",
]

PERSONALITY_SCORE_KEY_ORDER = [
    "big5_agreeableness",
    "big5_conscientiousness",
    "big5_extraversion",
    "big5_neuroticism",
    "big5_openness",
    "consumption_preferences_spur_of_moment",
    "consumption_preferences_credit_card_payment",
    "consumption_preferences_influence_brand_name",
    "consumption_preferences_influence_utility",
    "consumption_preferences_influence_online_ads",
    "consumption_preferences_influence_social_media",
    "consumption_preferences_influence_family_members",
    "consumption_preferences_clothes_quality",
    "consumption_preferences_clothes_style",
    "consumption_preferences_clothes_comfort",
    "consumption_preferences_automobile_ownership_cost",
    "consumption_preferences_automobile_safety",
    "consumption_preferences_music_rap",
    "consumption_preferences_music_country",
    "consumption_preferences_music_r_b",
    "consumption_preferences_music_hip_hop",
    "consumption_preferences_music_live_event",
    "consumption_preferences_music_playing",
    "consumption_preferences_music_latin",
    "consumption_preferences_music_rock",
    "consumption_preferences_music_classical",
    "consumption_preferences_gym_membership",
    "consumption_preferences_outdoor",
    "consumption_preferences_eat_out",
    "consumption_preferences_movie_romance",
    "consumption_preferences_movie_adventure",
    "consumption_preferences_movie_horror",
    "consumption_preferences_movie_musical",
    "consumption_preferences_movie_historical",
    "consumption_preferences_movie_science_fiction",
    "consumption_preferences_movie_war",
    "consumption_preferences_movie_drama",
    "consumption_preferences_movie_action",
    "consumption_preferences_movie_documentary",
    "consumption_preferences_read_frequency",
    "consumption_preferences_books_entertainment_magazines",
    "consumption_preferences_books_non_fiction",
    "consumption_preferences_books_financial_investing",
    "consumption_preferences_books_autobiographies",
    "consumption_preferences_volunteer",
    "consumption_preferences_concerned_environment",
    "consumption_preferences_start_business",
]


class Inference(Resource):
    """
    Machine learning inference resource

    :param Resource: Inherit from base flask-restful resource class
    :type Resource: Resource
    :return: Resource using Sagemaker machine learning endpoints
    :rtype: Resource
    """

    @staticmethod
    @UserManager.parse_user_session
    def get(user_id):
        """
        Endpoint to get shuffled user inference details and similar groups

        :param user_id: User identifier
        :type user_id: str
        """
        users = User.query_by_user_cluster_group(user_id)
        if not users or len(users) <= 0:
            return "No users found.", 400
        user_id_list = list(
            filter(
                lambda key: key != user_id,
                map(lambda user: user[InferenceGroup.id_key], users),
            )
        )
        user_info = User.query_multiple_users(
            random.sample(user_id_list, min(10, len(user_id_list)))
        )
        return user_info, 200

    @staticmethod
    @UserManager.parse_user_session
    @parse_params(
        Argument("personality_scores", location="form", required=True, type=str),
        Argument("audio_features", location="form", required=True, type=str),
        Argument("track_ids", location="form", required=True, type=str),
    )
    def post(user_id, personality_scores, audio_features, track_ids):
        """
        POST endpoint to get clustering result based on personality scores and audio features

        :param user_id: User identifier
        :type user_id: str
        :param personality_scores: Personality scores information
        :type personality_scores: dict
        :param audio_features: Average audio features information
        :type audio_features: dict
        :return: Flask base response class containing JSON data
        :rtype: BaseResponse
        """
        try:
            personality_scores = json.loads(personality_scores)
            audio_features = json.loads(audio_features)
            track_ids = json.loads(track_ids)
            personality_scores_raw = [
                personality_scores[key] for key in PERSONALITY_SCORE_KEY_ORDER
            ]
            audio_features_raw = [
                audio_features[key] for key in AUDIO_FEATURES_KEY_ORDER
            ]
            response = SagamakerService.get_inference(
                personality_scores_raw, audio_features_raw
            )
            assignment = response.data["body"]["predictions"][0]
            InferenceGroup.update(user_id, str(assignment["closest_cluster"]))
            User.update_insights_field(
                user_id,
                {
                    User.cluster_assignment: assignment,
                    User.inferred_from_track: track_ids,
                    User.average_audio_features: audio_features,
                },
            )
            return assignment, 200
        except (KeyError, json.JSONDecodeError) as e:
            return {"message": str(e)}, 400
