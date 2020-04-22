import {
    REQUEST_PERSONALITY_SCORE_ACTIONS,
    REQUEST_INFERENCE_ACTIONS,
    REQUEST_USER_GROUP_ACTIONS,
} from '@redux/actions/insight'
import genericAPISaga from '@redux/sagas/fetch'
import Api from '@services/api'

export const personalityInsightsSaga = genericAPISaga(
    Api.insight.getPersonalityScore,
    REQUEST_PERSONALITY_SCORE_ACTIONS
)

export const personalityInferenceSaga = genericAPISaga(
    Api.insight.getInference,
    REQUEST_INFERENCE_ACTIONS
)

export const personalityGroupSaga = genericAPISaga(
    Api.insight.getUserGroup,
    REQUEST_USER_GROUP_ACTIONS
)
