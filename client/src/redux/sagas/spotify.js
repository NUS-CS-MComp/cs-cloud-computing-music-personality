import {
    call,
    cancel,
    cancelled,
    fork,
    put,
    select,
    take,
} from 'redux-saga/effects'

import {
    REQUEST_SPOTIFY_RESOURCE,
    REQUEST_SPOTIFY_RESOURCE_SUCCESS,
    REQUEST_SPOTIFY_RESOURCE_FAILURE,
    REQUEST_SPOTIFY_RESOURCE_CANCEL,
} from '@redux/actions/spotify'
import { spotifyResourceLoadingSelector } from '@redux/selectors/spotify'
import Api from '@services/api'

/**
 * Worker saga to fetch Spotify resources
 * @param {string} resourceType Spotify resource type as defined in API map
 * @param {any[]} payload Request payload data in array type
 */
export function* fetchSpotifyResource(resourceType, payload = []) {
    const agent = Api.spotify.RESOURCE_API_MAP[resourceType]
    try {
        if (typeof agent !== 'undefined') {
            const { data } = yield call(agent, ...payload)
            yield put({
                type: REQUEST_SPOTIFY_RESOURCE_SUCCESS,
                resourceType,
                data,
            })
        }
    } catch (e) {
        yield put({ type: REQUEST_SPOTIFY_RESOURCE_FAILURE, resourceType })
    } finally {
        if (yield cancelled()) {
            yield put({ type: REQUEST_SPOTIFY_RESOURCE_CANCEL, resourceType })
        }
    }
}

/**
 * Root saga to listen to Spotify resource request actions
 */
export default function* watchSpotifyRequest() {
    const resourceFetchTaskMap = {}
    while (true) {
        const prevTaskLoadingStatus = yield select(
            spotifyResourceLoadingSelector
        )
        const { resourceType, payload } = yield take(REQUEST_SPOTIFY_RESOURCE)
        const prevTask = resourceFetchTaskMap[resourceType]
        if (prevTask && prevTaskLoadingStatus[resourceType]) {
            yield cancel(prevTask)
        }
        const task = yield fork(fetchSpotifyResource, resourceType, payload)
        resourceFetchTaskMap[resourceType] = task
    }
}
