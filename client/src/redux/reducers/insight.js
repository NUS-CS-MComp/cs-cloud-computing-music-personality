import { combineReducers } from 'redux'

import { REQUEST_PERSONALITY_SCORE_ACTIONS } from '@/redux/actions/insight'
import genericAPIReducer from '@redux/reducers/fetch'

export const personalityInsightsReducer = genericAPIReducer(
    REQUEST_PERSONALITY_SCORE_ACTIONS
)

export default combineReducers({
    personality: personalityInsightsReducer,
})
