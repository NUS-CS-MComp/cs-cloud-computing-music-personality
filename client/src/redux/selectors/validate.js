/**
 * Selector for all session validation status
 * @param {Record<string, string>} state Store state
 */
export const validitySelector = (state) => state.validate

/**
 * Selector for specific provider token validity
 * @param {string} provider Name of OAuth provider
 */
export const providerValiditySelector = (provider) => (state) =>
    validitySelector(state)[provider]
