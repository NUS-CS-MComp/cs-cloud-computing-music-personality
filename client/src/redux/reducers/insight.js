import { combineReducers } from 'redux'

import {
    REQUEST_PERSONALITY_SCORE_ACTIONS,
    REQUEST_INFERENCE_ACTIONS,
    REQUEST_USER_GROUP_ACTIONS,
} from '@redux/actions/insight'
import genericAPIReducer from '@redux/reducers/fetch'

export const personalityInsightsReducer = genericAPIReducer(
    REQUEST_PERSONALITY_SCORE_ACTIONS
)

export const personalityInferenceReducer = genericAPIReducer(
    REQUEST_INFERENCE_ACTIONS
)

export const personalityGroupReducer = genericAPIReducer(
    REQUEST_USER_GROUP_ACTIONS
)

export default combineReducers({
    personality: personalityInsightsReducer,
    inference: personalityInferenceReducer,
    group: personalityGroupReducer,
})
