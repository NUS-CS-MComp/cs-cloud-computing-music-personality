import http from './common'

/**
 * Endpoint to get user posts
 * @param {string} provider Social media provider name
 * @param {Record<string, string>} params Parameters to be passed to GET endpoint
 */
export const getUserPosts = (provider, params = {}) =>
    http.get(`/social/${provider}/posts`, { params })
