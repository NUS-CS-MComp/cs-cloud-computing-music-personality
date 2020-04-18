import json
import os

from services.base import BaseService


class Sagemaker(BaseService):
    """
    Sagamaker endpoint wrapper
    """

    def get_inference(self, personality_scores, audio_features):
        """
        Get inference from personality scores and audio features

        :param personality_scores: Scores in list format
        :type personality_scores: list
        :param audio_features: Average audio features in list format
        :type audio_features: list
        :return: Results from Sagamaker endpoint
        :rtype: dict
        """
        result = self.post(
            "",
            data=json.dumps(
                {"instances": [{"features": [personality_scores + audio_features]}]}
            ),
        )
        return result


INFERENCE_URL = os.getenv("INFERENCE_URL")

SagamakerService = Sagemaker("sagemaker", INFERENCE_URL)
