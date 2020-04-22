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
 * Endpoint to get track information
 * @param {string[]} trackID List of track IDs
 */
export const getTrackInformation = (trackID) =>
    http.get(
        `/spotify/track?${new URLSearchParams({
            track_ids: Array.from(new Set(trackID)).join(','),
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

/**
 * Name mapping to resource APIs
 */
export const RESOURCE_API_MAP = {
    category: getCategory,
    features: getAudioFeatures,
    recent: getRecentHistory,
    'recent-features': getRecentHistoryAudioFeatures,
    track: getTrackInformation,
}
