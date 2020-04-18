import { getFetchResourceActionList } from '@redux/actions/fetch'

export const REQUEST_PERSONALITY_SCORE_ACTIONS = getFetchResourceActionList(
    'PERSONALITY_SCORE'
)
export const REQUEST_INFERENCE_ACTIONS = getFetchResourceActionList(
    'PERSONALITY_INFERENCE'
)

/**
 * Action to fetch user information
 * @param {Record<string, string>} text List of text content to be aggregated
 */
export const requestPersonalityScore = (text) => ({
    type: REQUEST_PERSONALITY_SCORE_ACTIONS[0],
    payload: [text],
})

/**
 * Action to get inference from user data
 * @param {number[]} audioFeatures List of audio feature data
 * @param {number[]} personalityScores List of personality score data
 * @param {string[]} tracks List of track ID as reference
 */
export const requestPersonalityInference = (
    audioFeatures,
    personalityScores,
    tracks
) => ({
    type: REQUEST_INFERENCE_ACTIONS[0],
    payload: [audioFeatures, personalityScores, tracks],
})
