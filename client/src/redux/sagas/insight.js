import { REQUEST_PERSONALITY_SCORE_ACTIONS } from '@/redux/actions/insight'
import genericAPISaga from '@redux/sagas/fetch'
import Api from '@services/api'

export const personalityInsightsSaga = genericAPISaga(
    Api.insight.getPersonalityScore,
    REQUEST_PERSONALITY_SCORE_ACTIONS
)
