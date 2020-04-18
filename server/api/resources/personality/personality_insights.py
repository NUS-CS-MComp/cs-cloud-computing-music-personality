import os
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson import PersonalityInsightsV3
from flask_restful import Resource
from models.personality import Personality  # Placeholder - doesn't work yet

PERSONALITY_API_KEY = os.getenv("PERSONALITY_API_KEY")
PERSONALITY_URL = os.getenv("PERSONALITY_URL")

service = PersonalityInsightsV3(
    version="2017-10-13", authenticator=IAMAuthenticator(apikey=PERSONALITY_API_KEY))
service.set_service_url(PERSONALITY_URL)


class PersonalityScore(Resource):
    """
    IBM Personality Insights

    :return: Spotify song category list resource class
    :rtype: Resource
    """

    @staticmethod
    def get():
        """
        Fetch category list of songs

        :param text: Textual data of minimum 100 words
        :type access_token: str
        :return: Results from Personality Insights in JSON format
        :rtype:
        """
        text = 'Born in National City, California, Robinson was the youngest of four children of a lawyer and a teacher. He was awarded from the University of California, Berkeley in mathematics: the BA (1932), MA (1933), and Ph.D. (1935). His Ph.D. thesis, on complex analysis, was titled Some results in the theory of Schlicht functions. In 1941, Robinson married his former student Julia Bowman. She became his Berkeley colleague and the first woman president of the American Mathematical Society. Robinson worked on mathematical logic, set theory, geometry, number theory, and combinatorics. In 1937 he set out a simpler and more conventional version of the John von Neumann 1923 axiomatic set theory. Soon after Alfred Tarski joined Berkeley\'s mathematics department in 1942, Robinson began to do major work on the foundations of mathematics, building on Tarski\'s concept of essential undecidabilility, by proving a number of mathematical theories undecidable. In 1950 Robinson proved that an essentially undecidable theory need not have an infinite number of axioms by coming up with a counterexample: Robinson arithmetic Q. Q is finitely axiomatizable because it lacks Peano arithmetic\'s axiom schema of induction; nevertheless Q, like Peano arithmetic, is incomplete and undecidable in the sense of Gödel. Robinson\'s work on undecidability culminated in his coauthoring Tarski et al. (1953), which established, among other things, the undecidability of group theory, lattice theory, abstract projective geometry, and closure algebras.'
        result = service.profile({'contentItems': [
            {'content': text}]}, accept='application/json', raw_scores=True, consumption_preferences=True).get_result()
        # Placeholder - doesn't work yet
        Personality.create('test', result['personality'],
                           result['consumption_preferences'])
