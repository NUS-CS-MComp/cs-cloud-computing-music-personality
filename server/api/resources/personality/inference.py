from flask_restful import Resource
from flask_restful.reqparse import Argument
from models.user import User
from services import SagamakerService
from utils import parse_params, UserManager


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
    @parse_params(
        Argument("personality_scores", location="json", required=True, type=list),
        Argument("audio_features", location="json", required=True, type=list),
        Argument("track_ids", location="json", required=True, type=list),
    )
    def post(user_id, personality_scores, audio_features, track_ids):
        """
        POST endpoint to get clustering result based on personality scores and audio features

        :param personality_scores: Scores in list format
        :type personality_scores: list
        :param audio_features: Average audio features in list format
        :type audio_features: list
        :return: Flask base response class containing JSON data
        :rtype: BaseResponse
        """
        response = SagamakerService.get_inference(personality_scores, audio_features)
        try:
            assignment = response.data["body"]["predictions"][0]
            User.update_insights_field(
                user_id,
                {
                    User.cluster_assignment: assignment,
                    User.inferred_from_track: track_ids,
                },
            )
            return assignment, 200
        except KeyError:
            return response.data, 400
