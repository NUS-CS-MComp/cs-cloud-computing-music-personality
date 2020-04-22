export const OAUTH_INIT = 'OAUTH_INIT'
export const OAUTH_CANCEL = 'OAUTH_CANCEL'
export const OAUTH_CLEAR = 'OAUTH_CLEAR'
export const OAUTH_COMPLETE = 'OAUTH_COMPLETE'
export const OAUTH_FAILURE = 'OAUTH_FAILURE'
export const OAUTH_PROCESS_SUCCESS = 'OAUTH_PROCESS_SUCCESS'
export const OAUTH_PROCESS_FAILURE = 'OAUTH_PROCESS_FAILURE'

/**
 * Action to start OAuth process
 * @param {string} provider Name of OAuth provider
 */
export const startOAuth = (provider) => ({
    type: `${provider.toUpperCase()}_${OAUTH_INIT}`,
    provider,
})

/**
 * Action to cancel OAuth process
 * @param {string} provider Name of OAuth provider
 */
export const cancelOAuth = (provider) => ({
    type: `${provider.toUpperCase()}_${OAUTH_CANCEL}`,
    provider,
})

/**
 * Action to clear previous OAuth process
 * @param {string} provider Name of OAuth provider
 */
export const clearOAuth = (provider) => ({
    type: `${provider.toUpperCase()}_${OAUTH_CLEAR}`,
    provider,
})
