import http from './common'

/**
 * Endpoint to get audio features
 * @param {string} trackID Track ID
 */
export const getAudioFeatures = (trackID) =>
    http.get(
        `/spotify/audio-features?${new URLSearchParams({
            track_id: trackID,
        }).toString()}`
    )

/**
 * Endpoint to get music category
 */
export const getCategory = () => http.get(`/spotify/category`)

/**
 * Endpoint to get recent listening history
 */
export const getRecentHistory = () => http.get(`/spotify/recent`)

/**
 * Endpoint to get audio features of recent history
 */
export const getRecentHistoryAudioFeatures = () =>
    http.get(`/spotify/recent/audio-features`)
