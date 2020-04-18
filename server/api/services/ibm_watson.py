import os

from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson import PersonalityInsightsV3
from services.base import BaseService, BaseServiceResult


class IBMWatson(BaseService):
    """
    IBM Watson service wrapper
    """

    def __init__(self, service_wrapper, service_url):
        """
        Initiate the service engine

        :param service_wrapper: IBM Watson service engine
        :type service_wrapper: PersonalityInsightsV3
        :param service_url: IBM Watson service URL address
        :type service_url: str
        """
        super().__init__("ibm", service_url)
        self.service = service_wrapper

    def get_personality_scores(self, text_content):
        """
        Get personality scores from textual content

        :param text_content: Textual data of minimum 100 words
        :type text_content: str
        :return: Results from service engine
        :rtype: dict
        """
        result = self.service.profile(
            {"contentItems": [{"content": text_content}]},
            accept="application/json",
            raw_scores=True,
            consumption_preferences=True,
        ).get_result()
        return BaseServiceResult(200, result)


PERSONALITY_API_KEY = os.getenv("PERSONALITY_API_KEY")
PERSONALITY_URL = os.getenv("PERSONALITY_URL")
PERSONALITY_ENGINE = PersonalityInsightsV3(
    version="2017-10-13", authenticator=IAMAuthenticator(apikey=PERSONALITY_API_KEY)
)
PERSONALITY_ENGINE.set_service_url(PERSONALITY_URL)

IBMWatsonService = IBMWatson(PERSONALITY_ENGINE, PERSONALITY_URL)
