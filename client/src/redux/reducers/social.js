import lodash from 'lodash'

import {
    FETCH_SOCIAL_POST_INIT,
    FETCH_SOCIAL_POST_CANCEL,
    FETCH_SOCIAL_POST_FAILURE,
    FETCH_SOCIAL_POST_SUCCESS,
} from '@redux/actions/social'

/**
 * Reducer for fetching social post resources
 * @param {Record<string, string>} state Social post resource fetching state
 * @param {{ type: string, provider: string, data: any}} action Action type and payload data for social post fetching process
 */
export default (state = {}, { type, provider, data }) => {
    const prevState = lodash.cloneDeep(state)
    switch (type) {
        case FETCH_SOCIAL_POST_INIT:
            if (typeof prevState[provider] !== 'undefined') {
                Object.assign(prevState[provider], { loading: true })
            } else prevState[provider] = { loading: true }
            return prevState
        case FETCH_SOCIAL_POST_CANCEL:
            return lodash.omit(state, provider)
        case FETCH_SOCIAL_POST_FAILURE:
            return {
                ...lodash.omit(state, provider),
                [provider]: { failed: true },
            }
        case FETCH_SOCIAL_POST_SUCCESS:
            return { ...state, [provider]: data }
        default:
            return state
    }
}
