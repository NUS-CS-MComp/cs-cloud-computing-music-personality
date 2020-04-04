import { call, cancel, put, race, spawn, take } from 'redux-saga/effects'

import {
    OAUTH_COMPLETE,
    OAUTH_FAILURE,
    OAUTH_INIT,
    OAUTH_PROCESS_SUCCESS,
} from '@redux/actions/oauth'
import { VALIDATE_INIT } from '@redux/actions/validate'
import Api from '@services/api'
import OAuthServiceFactory from '@services/oauth/factory'

/**
 * * Helper functions
 * * Pattern are used to filter action type and messages
 */

const constructPattern = (action) => new RegExp(`^[A-Z]+_${action}$`)
const OAUTH_INIT_PATTERN = constructPattern(OAUTH_INIT)
const OAUTH_PROCESS_SUCCESS_PATTERN = constructPattern(OAUTH_PROCESS_SUCCESS)

/**
 * Helper function to tell if the action marks start of OAuth process
 * @param {string} type Action type string
 */
const isOAuthInit = (type) => OAUTH_INIT_PATTERN.test(type)

/**
 * Helper function to mark completion event of OAuth process, either success or failure
 * @param {string} type Action type string
 */
const isOAuthProcessSuccess = (type) => OAUTH_PROCESS_SUCCESS_PATTERN.test(type)

/**
 * * Sub-routines for handling OAuth events
 * * OAuth events could either start from the beginning or from completion stage for redirection mechanism based process
 */

/**
 * Helper function to construct completion action
 * @param {string} provider OAuth provider name
 */
const constructCompleteAction = (provider) =>
    `${provider.toUpperCase()}_${OAUTH_COMPLETE}`

/**
 * Helper function to construct failure action
 * @param {string} provider OAuth provider name
 */
const constructFailureAction = (provider) =>
    `${provider.toUpperCase()}_${OAUTH_FAILURE}`

/**
 * Worker saga for Twitter OAuth completion process
 * @param {Record<string, string>} data Action payload data
 */
export function* completeTwitterOAuth(data) {
    const { oauth_token: oauthToken, oauth_verifier: oauthVerifier } = data
    const provider = 'twitter'
    const { data: result } = yield call(
        Api.oauth.twitterExchangeOAuthToken,
        oauthToken,
        oauthVerifier
    )
    yield put({ type: constructCompleteAction(provider), provider, ...result })
}

/**
 * Worker saga for generic OAuth completion process
 * @param {string} provider OAuth provider name
 * @param {Record<string, string>} data Action payload data
 */
export function* completeGenericOAuth(provider, data) {
    const { code } = data
    const service = OAuthServiceFactory.getOAuthService(provider)
    const { data: result } = yield call(
        Api.oauth.genericOAuthExchangeAccessToken,
        provider,
        service.processor.callbackURL,
        code
    )
    yield put({ type: constructCompleteAction(provider), provider, ...result })
}

/**
 * Worker saga for handling Twitter OAuth steps
 */
export function* startTwitterOAuth() {
    const service = OAuthServiceFactory.getOAuthService('twitter')
    service.prepareParams()
    const callbackURL = `${service.processor.callbackURL}&state=${service.state}`
    const { data: result } = yield call(
        Api.oauth.twitterInitiateOAuthToken,
        callbackURL
    )
    if (result.oauth_callback_confirmed === 'true') {
        service.processor.addParams('oauth_token', result.oauth_token)
        yield* startGenericOAuth('twitter')
    }
}

/**
 * Worker saga for generic OAuth start process
 * @param {string} provider Name of the OAuth provider
 */
export function* startGenericOAuth(provider) {
    const service = OAuthServiceFactory.getOAuthService(provider)
    const result = yield call(service.authenticate.bind(service))
    const { status, data } = result
    yield put({ type: status, ...data })
}

/**
 * * Watcher dispatcher and handler
 * * Dispatcher patterns are used to handle special cases (e.g. Twitter OAuth steps)
 */

/**
 * Helper function to dispatch different worker to OAuth completion process
 * @param {string} provider Name string of OAuth provider
 * @param {Record<string, string>} data OAuth result data
 */
export function* dispatchCompleteOAuthWorker(provider, data) {
    try {
        switch (provider) {
            case 'twitter':
                yield call(completeTwitterOAuth, data)
                break
            default:
                yield call(completeGenericOAuth, provider, data)
                break
        }
        yield put({ type: VALIDATE_INIT, provider })
    } catch (e) {
        yield put({
            type: constructFailureAction(provider),
            message: e.toString(),
            provider,
        })
    }
}

/**
 * Helper function to dispatch different worker to OAuth start process
 * @param {string} provider Name string of OAuth provider
 */
export function* dispatchStartOAuthWorker(provider) {
    try {
        switch (provider) {
            case 'twitter':
                yield call(startTwitterOAuth)
                break
            default:
                yield call(startGenericOAuth, provider)
                break
        }
    } catch (e) {
        yield put({
            type: constructFailureAction(provider),
            message: e.toString(),
            provider,
        })
    }
}

/**
 * Root saga watcher for OAuth event
 */
export default function* watchOAuthProcess() {
    const fullOAuthTaskMap = {}
    while (true) {
        const { complete, full } = yield race({
            complete: take((action) => isOAuthProcessSuccess(action.type)),
            full: take((action) => isOAuthInit(action.type)),
        })
        if (full) {
            const prevTask = fullOAuthTaskMap[full.provider]
            if (prevTask) yield cancel(prevTask)
            const fullOAuthTask = yield spawn(
                dispatchStartOAuthWorker,
                full.provider
            )
            fullOAuthTaskMap[full.provider] = fullOAuthTask
        }
        if (complete) {
            yield spawn(
                dispatchCompleteOAuthWorker,
                complete.provider,
                complete
            )
        }
    }
}
