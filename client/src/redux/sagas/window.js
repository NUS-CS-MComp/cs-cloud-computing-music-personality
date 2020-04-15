import { call, take } from 'redux-saga/effects'

import { RELOAD_WINDOW } from '@redux/actions/window'

/**
 * Simple saga watcher for window reload action
 */
export default function* reloadWindow() {
    while (true) {
        yield take(RELOAD_WINDOW)
        yield call(() => window.location.reload(false))
    }
}
