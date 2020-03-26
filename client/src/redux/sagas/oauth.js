import { call, put, spawn, take } from 'redux-saga/effects'

import Api from '@services/api'
import OAuthServiceFactory from '@services/oauth/factory'

const OAUTH_START_PATTERN = /^[A-Z]+_OAUTH_START$/i

/**
 * Worker saga for handling Twitter OAuth steps
 */
export function* startTwitterOAuth() {
    const service = OAuthServiceFactory.getOAuthService('twitter')
    service.prepareParams()
    const callbackURL = `${service.processor.callbackURL}&state=${service.state}`
    yield call(Api.oauth.twitterInitiateOAuthToken, callbackURL)
}

/**
 * Worker saga for generic OAuth start process
 * @param {string} provider Name of the OAuth provider
 */
export function* startGenericOAuth(provider) {
    const service = OAuthServiceFactory.getOAuthService(provider)
    const { status, data } = yield call(service.authenticate.bind(service))
    yield put({ type: status, oauth_provider: data.provider, ...data })
}

/**
 * Helper function to dispatch different worker to OAuth start process
 * @param {string} provider
 */
const dispatchStartOAuthWorker = (provider) => {
    switch (provider) {
        case 'twitter':
            return [startTwitterOAuth]
        default:
            return [startGenericOAuth, provider]
    }
}

export default function* watchOAuth() {
    while (true) {
        const { oauth_provider: provider, type: actionType } = yield take(
            (action) => action.oauth_provider
        )
        if (OAUTH_START_PATTERN.test(actionType)) {
            yield spawn(...dispatchStartOAuthWorker(provider))
        }
    }
}
