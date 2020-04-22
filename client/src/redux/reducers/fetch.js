import assertRequestPattern from '@utils/assert-request-pattern'

/**
 * Reducer for generic API request
 * @param {string[]} actionTypes Action type array
 */
export default function fetchAPIServiceRequestReducer(actionTypes) {
    assertRequestPattern(actionTypes)
    return (state = {}, { type, data }) => {
        switch (type) {
            case actionTypes[0]: // Request initiation
                return {
                    ...state,
                    loading: true,
                }
            case actionTypes[1]: // Request success
                return { success: true, data }
            case actionTypes[2]: // Request failure
                return { failed: true }
            case actionTypes[3]: // Request cancel
                return { cancelled: true }
            default:
                return state
        }
    }
}
