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
    switch (type) {
        case VALIDATE_INIT:
            return { ...state, [provider]: { is_loading: true } }
        case VALIDATE_FAILURE:
            return { ...state, ...data }
        case VALIDATE_SUCCESS:
            return { ...state, ...data }
        case VALIDATE_FULL_INIT:
            return { is_loading: true }
        case VALIDATE_FULL_COMPLETE:
            return { ...lodash.omit(state, 'is_loading'), ...data }
        case VALIDATE_FULL_FAILURE:
            return { ...lodash.omit(state, 'is_loading'), ...data }
        default:
            return state
    }
}
