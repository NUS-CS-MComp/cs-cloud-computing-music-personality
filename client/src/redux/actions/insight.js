import { getFetchResourceActionList } from '@redux/actions/fetch'

export const REQUEST_PERSONALITY_SCORE_ACTIONS = getFetchResourceActionList(
    'PERSONALITY_SCORE'
)

/**
 * Action to fetch user information
 * @param {string[]} text List of text content to be aggregated
 */
export const requestPersonalityScore = (text) => ({
    type: REQUEST_PERSONALITY_SCORE_ACTIONS[0],
    payload: text,
})
