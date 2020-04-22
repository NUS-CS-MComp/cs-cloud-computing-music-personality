import { put, take, fork } from 'redux-saga/effects'

import {
    REQUEST_USER_INFO_ACTIONS,
    REQUEST_USER_INFO_CHANGE_ACTIONS,
    DISCONNECT_PROVIDER_ACTIONS,
    USER_LOGOUT_ACTIONS,
    USER_DELETE_ACTIONS,
} from '@redux/actions/user'
import {
    REQUEST_PERSONALITY_SCORE_ACTIONS,
    REQUEST_INFERENCE_ACTIONS,
} from '@redux/actions/insight'
import { RELOAD_WINDOW } from '@redux/actions/window'
import genericAPISaga from '@redux/sagas/fetch'
import Api from '@services/api'

export const userInfoSaga = genericAPISaga(
    Api.user.getUserInfo,
    REQUEST_USER_INFO_ACTIONS
)

export const userProfileChangeSaga = genericAPISaga(
    Api.user.updateUserProfile,
    REQUEST_USER_INFO_CHANGE_ACTIONS
)

export const disconnectProviderSaga = genericAPISaga(
    Api.user.removeUserConnection,
    DISCONNECT_PROVIDER_ACTIONS
)

export const logoutUserSaga = genericAPISaga(
    Api.user.logoutUser,
    USER_LOGOUT_ACTIONS
)

export const deleteUserSaga = genericAPISaga(
    Api.user.deleteUser,
    USER_DELETE_ACTIONS
)

/**
 * Saga watcher for user information related requests
 */
export function* refreshUserProfileSaga() {
    yield fork(function* requestWatcher() {
        while (true) {
            yield take([
                REQUEST_USER_INFO_CHANGE_ACTIONS[1],
                REQUEST_PERSONALITY_SCORE_ACTIONS[1],
                REQUEST_INFERENCE_ACTIONS[1],
            ])
            yield put({ type: REQUEST_USER_INFO_ACTIONS[0] })
        }
    })
    yield fork(function* disconnectRequestWatcher() {
        while (true) {
            yield take([
                DISCONNECT_PROVIDER_ACTIONS[1],
                USER_LOGOUT_ACTIONS[1],
                USER_DELETE_ACTIONS[1],
            ])
            yield put({ type: RELOAD_WINDOW })
        }
    })
}
