import http from './common'

/**
 * Endpoint to get personality score based on text content
 * @param {Record<string, string>[]} text List of text content to be aggregated
 */
export const getPersonalityScore = (text) =>
    http.post('user/personality', { text_content: text })

/**
 * Endpoint to get clustering inference based on audio features and personality scores
 * @param {number[]} audioFeatures List of audio feature data
 * @param {number[]} personalityScores List of personality score data
 * @param {string[]} tracks List of track ID as reference
 */
export const getInference = (audioFeatures, personalityScores, tracks) =>
    http.post('user/infer', {
        audio_features: audioFeatures,
        personality_scores: personalityScores,
        track_ids: tracks,
    })
