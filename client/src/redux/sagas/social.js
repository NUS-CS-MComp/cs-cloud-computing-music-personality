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
    FETCH_SOCIAL_POST_INIT,
    FETCH_SOCIAL_POST_FAILURE,
    FETCH_SOCIAL_POST_SUCCESS,
    FETCH_SOCIAL_POST_CANCEL,
} from '@redux/actions/social'
import { providerValiditySelector } from '@redux/selectors/validate'
import { socialPostLoadingSelector } from '@redux/selectors/social'
import Api from '@services/api'

/**
 * Helper function to handle extra provider parameters
 * @param {string} provider Social platform provider name
 */
export function* getProviderParams(provider) {
    const { data } = yield select(providerValiditySelector(provider))
    switch (provider) {
        case 'reddit':
            if (typeof data === 'undefined') {
                throw new Error('No valid token data')
            }
            return { user_name: data.name }
        default:
            return {}
    }
}

/**
 * Worker saga for fetching social media posts
 * @param {string} provider Social platform provider name
 */
export function* fetchSocialPost(provider) {
    try {
        const params = yield getProviderParams(provider)
        const { data } = yield call(Api.social.getUserPosts, provider, params)
        yield put({ type: FETCH_SOCIAL_POST_SUCCESS, provider, data })
    } catch (e) {
        yield put({ type: FETCH_SOCIAL_POST_FAILURE, provider })
    } finally {
        if (yield cancelled()) {
            yield put({ type: FETCH_SOCIAL_POST_CANCEL, provider })
        }
    }
}

/**
 * Root saga watcher for action indicating start of social post fetching process
 */
export default function* watchSocialPostFetchAction() {
    const fetchSocialPostTaskMap = {}
    while (true) {
        const prevTaskLoadingStatus = yield select(socialPostLoadingSelector)
        const { provider } = yield take(FETCH_SOCIAL_POST_INIT)
        const prevTask = fetchSocialPostTaskMap[provider]
        if (prevTask && prevTaskLoadingStatus[provider]) yield cancel(prevTask)
        const fetchTask = yield fork(fetchSocialPost, provider)
        fetchSocialPostTaskMap[provider] = fetchTask
    }
}
