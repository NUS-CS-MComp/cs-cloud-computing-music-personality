import lodash from 'lodash'

import {
    VALIDATE_INIT,
    VALIDATE_FAILURE,
    VALIDATE_SUCCESS,
    VALIDATE_FULL_INIT,
    VALIDATE_FULL_COMPLETE,
    VALIDATE_FULL_FAILURE,
} from '@redux/actions/validate'

/**
 * Reducer for session validation process handling
 * @param {Record<string, string>} state Session validation process state
 * @param {{ type: string, provider: string, data: any}} action Action type and payload data for session validation process
 */
export default (state = {}, { type, provider, data }) => {
    const prevState = lodash.cloneDeep(state)
    switch (type) {
        case VALIDATE_INIT:
            if (typeof prevState[provider] !== 'undefined') {
                Object.assign(prevState[provider], { loading: true })
            } else {
                prevState[provider] = { loading: true }
            }
            return prevState
        case VALIDATE_FAILURE:
            return { ...state, [provider]: { failed: true } }
        case VALIDATE_SUCCESS:
            return { ...lodash.omit(state, provider), ...data }
        case VALIDATE_FULL_INIT:
            return { ...state, loading: true }
        case VALIDATE_FULL_COMPLETE:
            return {
                ...lodash.omit(state, 'loading'),
                ...Object.keys(data).reduce((newData, providerName) => {
                    if (state[providerName] && !!state[providerName].used) {
                        return Object.assign(newData, {
                            [providerName]: state[providerName],
                        })
                    }
                    return Object.assign(newData, {
                        [providerName]: data[providerName],
                    })
                }, {}),
            }
        case VALIDATE_FULL_FAILURE:
            return { ...lodash.omit(state, 'loading'), failed: true }
        default:
            return state
    }
}
