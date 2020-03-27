import http from './common'

/**
 * Endpoint to get audio features
 * @param {string} trackID Track ID
 * @param {string} token Access token
 */
export const getAudioFeatures = (trackID, token) =>
    http.get(
        `/spotify/audio-features?${new URLSearchParams({
            track_id: trackID,
            token,
        }).toString()}`
    )

/**
 * Endpoint to get music category
 * @param {string} token Access token
 */
export const getCategory = (token) =>
    http.get(`/spotify/category?token=${encodeURIComponent(token)}`)

/**
 * Endpoint to get recent listening history
 * @param {string} token Access token
 */
export const getRecentHistory = (token) =>
    http.get(`/spotify/recent?token=${encodeURIComponent(token)}`)

/**
 * Endpoint to get audio features of recent history
 * @param {string} token Access token
 */
export const getRecentHistoryAudioFeatures = (token) =>
    http.get(
        `/spotify/recent/audio-features?token=${encodeURIComponent(token)}`
    )
