import http from './common'

/**
 * Endpoint to get personality score based on text content
 * @param {string[]} text List of text content to be aggregated
 */
export const getPersonalityScore = (text) =>
    http.post('user/personality', { text_content: text })
