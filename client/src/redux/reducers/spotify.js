import lodash from 'lodash'

import {
    REQUEST_SPOTIFY_RESOURCE,
    REQUEST_SPOTIFY_RESOURCE_SUCCESS,
    REQUEST_SPOTIFY_RESOURCE_FAILURE,
    REQUEST_SPOTIFY_RESOURCE_CANCEL,
} from '@redux/actions/spotify'

/**
 * Reducer for fetching Spotify resources
 * @param {Record<string, string>} state Spotify resource fetching state
 * @param {{ type: string, resourceType: string, data: any}} action Action type and payload data for Spotify resource request
 */
export default (state = {}, { type, resourceType, data }) => {
    const prevState = lodash.cloneDeep(state)
    switch (type) {
        case REQUEST_SPOTIFY_RESOURCE:
            if (typeof prevState[resourceType] !== 'undefined') {
                Object.assign(prevState[resourceType], { is_loading: true })
            } else prevState[resourceType] = { is_loading: true }
            return prevState
        case REQUEST_SPOTIFY_RESOURCE_CANCEL:
            return lodash.omit(state, resourceType)
        case REQUEST_SPOTIFY_RESOURCE_FAILURE:
            return {
                ...lodash.omit(state, resourceType),
                [resourceType]: { is_failed: true },
            }
        case REQUEST_SPOTIFY_RESOURCE_SUCCESS:
            return { ...state, [resourceType]: data }
        default:
            return state
    }
}
