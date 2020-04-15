import { call, cancelled, put, takeLatest } from 'redux-saga/effects'

import assertRequestPattern from '@utils/assert-request-pattern'

/**
 * Generic saga worker for API request
 * @param {function} agent API endpoint service function
 * @param {string[]} actionTypes Action type array
 * @param  {{ type: string, payload: Record<string, string>}} actionData Data from dispatching action
 */
export function* fetchAPIServiceRequestWorker(agent, actionTypes, { payload }) {
    try {
        const { data } = yield call(agent, payload)
        yield put({ type: actionTypes[1], data })
    } catch (e) {
        yield put({ type: actionTypes[2] })
    } finally {
        if (yield cancelled()) {
            yield put({ type: actionTypes[3] })
        }
    }
}

/**
 * Generic saga watcher for API request
 * @param {function} agent API endpoint service function
 * @param {string[]} actionTypes Action type array
 */
export default (agent, actionTypes) => {
    assertRequestPattern(actionTypes)
    return function* fetchAPIServiceRequestListener() {
        yield takeLatest(
            actionTypes[0],
            fetchAPIServiceRequestWorker,
            agent,
            actionTypes
        )
    }
}
