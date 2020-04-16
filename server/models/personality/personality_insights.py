import os
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson import PersonalityInsightsV3

PERSONALITY_API_KEY = os.getenv("PERSONALITY_API_KEY")
PERSONALITY_URL = os.getenv("PERSONALITY_URL")

service = PersonalityInsightsV3(
    version="2017-10-13", authenticator=IAMAuthenticator(apikey=PERSONALITY_API_KEY))
service.set_service_url(PERSONALITY_URL)


def get_personality_score(text):
    """
    Fetch category list of songs

    :param text: Textual data of minimum 100 words
    :type access_token: str
    :return: Results from Personality Insights in JSON format
    :rtype:
    """
    return service.profile({'contentItems': [{'content': text}]}, accept='application/json', raw_scores=True, consumption_preferences=True).get_result()
