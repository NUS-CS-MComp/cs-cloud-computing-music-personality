export const OAUTH_START = 'OAUTH_START'
export const OAUTH_SUCCESS = 'OAUTH_SUCCESS'
export const OAUTH_FAILURE = 'OAUTH_FAILURE'

/**
 * Action to start OAuth process
 * @param {string} provider Name of OAuth provider
 */
export const oauthStart = (provider) => ({
    type: OAUTH_START,
    provider,
})

/**
 * Action to dispatch OAuth process success event
 * @param {string} provider Name of OAuth provider
 * @param {any} data Payload data from OAuth process
 */
export const oauthSuccess = (provider, data) => ({
    type: OAUTH_SUCCESS,
    provider,
    data,
})

/**
 * Action to dispatch OAuth process failure event
 * @param {string} provider Name of OAuth provider
 */
export const oauthFailure = (provider) => ({
    type: OAUTH_FAILURE,
    provider,
})
