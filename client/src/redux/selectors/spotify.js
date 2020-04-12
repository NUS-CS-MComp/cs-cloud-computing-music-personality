import { createSelector } from 'reselect'

/**
 * Selector for all Spotify resources
 * @param {Record<string, string>} state Store state
 */
export const spotifyResourceSelector = (state) => state.spotify

/**
 * Selector for specific Spotify resource
 * @param {string} resourceType Resource type string
 */
export const spotifyResourceDataSelector = (resourceType) =>
    createSelector(spotifyResourceSelector, (data) => data[resourceType])

/**
 * Select for Spotify resource fetch task loading status
 */
export const spotifyResourceLoadingSelector = createSelector(
    spotifyResourceSelector,
    (data) =>
        Object.keys(data).reduce((acc, resourceType) => {
            const resourceData = data[resourceType]
            if (
                typeof resourceData === 'undefined' ||
                typeof resourceData.loading === 'undefined'
            ) {
                return Object.assign(acc, { [resourceType]: false })
            }
            return Object.assign(acc, { [resourceType]: true })
        }, {})
)
