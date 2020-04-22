import queryString from 'query-string'

import http from './common'

/**
 * Endpoint to get personality score based on text content
 * @param {Record<string, string>[]} text List of text content to be aggregated
 */
export const getPersonalityScore = (text) =>
    http.post(
        'user/personality',
        queryString.stringify({ text_content: JSON.stringify(text) })
    )

/**
 * Endpoint to get clustering inference based on audio features and personality scores
 * @param {Record<string, number>} audioFeatures Average audio feature data
 * @param {Record<string, number>} personalityScores Personality score data
 * @param {string[]} tracks List of track ID as reference
 */
export const getInference = (audioFeatures, personalityScores, tracks) =>
    http.post(
        'user/infer',
        queryString.stringify({
            audio_features: JSON.stringify(audioFeatures),
            personality_scores: JSON.stringify(personalityScores),
            track_ids: JSON.stringify(tracks),
        })
    )

/**
 * Endpoint to get user cluster group details
 */
export const getUserGroup = () => http.get('user/infer')
