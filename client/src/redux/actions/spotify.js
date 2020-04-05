export const REQUEST_SPOTIFY_RESOURCE = 'REQUEST_SPOTIFY_RESOURCE'
export const REQUEST_SPOTIFY_RESOURCE_SUCCESS =
    'REQUEST_SPOTIFY_RESOURCE_SUCCESS'
export const REQUEST_SPOTIFY_RESOURCE_FAILURE =
    'REQUEST_SPOTIFY_RESOURCE_FAILURE'
export const REQUEST_SPOTIFY_RESOURCE_CANCEL = 'REQUEST_SPOTIFY_RESOURCE_CANCEL'

/**
 * Action to start fetching Spotify resources
 * @param {string} resourceType Spotify resource type
 * @param {any[]} payload Request payload data in array type
 */
export const requestSpotifyResource = (resourceType, payload) => ({
    type: REQUEST_SPOTIFY_RESOURCE,
    resourceType,
    payload,
})
