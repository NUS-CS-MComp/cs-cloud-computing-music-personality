/**
 * Patterns to test input action types for generic API endpoint requests
 */
const constructPattern = (name, suffix) => ({
    name,
    regex: new RegExp(`^(REQUEST|FETCH)(_[A-Z]+)+${suffix}$`),
})
const REQUEST_INIT_PATTERN = constructPattern('request init', '(_INIT)?')
const REQUEST_SUCCESS_PATTERN = constructPattern('request success', '_SUCCESS')
const REQUEST_FAILURE_PATTERN = constructPattern('request failure', '_FAILURE')
const REQUEST_CANCEL_PATTERN = constructPattern('request cancel', '_CANCEL')
const ACTION_TYPE_PATTERN_ORDER = [
    REQUEST_INIT_PATTERN,
    REQUEST_SUCCESS_PATTERN,
    REQUEST_FAILURE_PATTERN,
    REQUEST_CANCEL_PATTERN,
]

/**
 * Helper function to test action type series to match generic request processing flow
 * @param {string[]} actionTypes Action type array
 */
export default (actionTypes) => {
    actionTypes.forEach((actionType, index) => {
        const pattern = ACTION_TYPE_PATTERN_ORDER[index]
        if (!pattern.regex.test(actionType)) {
            throw new Error(
                `Action type ${actionType} does not fulfill ${pattern.name} pattern.`
            )
        }
    })
}
