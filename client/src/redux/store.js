import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all, call, spawn } from 'redux-saga/effects'

import logger from '@utils/logger'
import * as reducers from './reducers'
import * as sagas from './sagas'

/**
 * Include Redux Saga and Redux dev tools
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    combineReducers({ ...reducers }),
    composeEnhancers(applyMiddleware(sagaMiddleware))
)

/**
 * Root saga pattern from https://redux-saga.js.org/docs/advanced/RootSaga.html
 */
sagaMiddleware.run(function* rootSaga() {
    yield all(
        Object.values(sagas).map((saga) =>
            // Spawn child saga and catch errors
            spawn(function* subSaga() {
                while (true) {
                    try {
                        yield call(saga)
                        break
                    } catch (e) {
                        logger.error(e)
                    }
                }
            })
        )
    )
})

export default store
