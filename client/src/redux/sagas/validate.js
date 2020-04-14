import { call, fork, put, take } from 'redux-saga/effects'

import {
    VALIDATE_INIT,
    VALIDATE_FAILURE,
    VALIDATE_SUCCESS,
    VALIDATE_FULL_INIT,
    VALIDATE_FULL_COMPLETE,
    VALIDATE_FULL_FAILURE,
} from '@redux/actions/validate'
import Api from '@services/api'

/**
 * Worker saga for session validation process of a specific OAuth provider
 * Access token information stored in cookies are used to test its validity
 */
export function* validateProviderCredentials() {
    const { provider } = yield take(VALIDATE_INIT)
    try {
        const { data } = yield call(Api.user.getUserValidationStatus, provider)
        yield put({ type: VALIDATE_SUCCESS, provider, data })
    } catch (e) {
        yield put({ type: VALIDATE_FAILURE, provider })
    }
}

/**
 * Worker saga for full token session validation flow
 */
export function* validateAllCredentials() {
    yield take(VALIDATE_FULL_INIT)
    try {
        const { data } = yield call(Api.user.getUserValidationStatus)
        yield put({ type: VALIDATE_FULL_COMPLETE, data })
    } catch (e) {
        yield put({ type: VALIDATE_FULL_FAILURE })
    }
}

/**
 * Root saga watcher for action indicating start of session validation process
 */
export default function* watchValidationProcess() {
    yield fork(validateAllCredentials)
    yield fork(validateProviderCredentials)
}
