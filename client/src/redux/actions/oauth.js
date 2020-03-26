export const OAUTH_START = 'OAUTH_START'
export const OAUTH_SUCCESS = 'OAUTH_SUCCESS'
export const OAUTH_FAILURE = 'OAUTH_FAILURE'

/**
 * Action to start OAuth process
 * @param {string} provider Name of OAuth provider
 */
export const startOAuth = (provider) => ({
    type: `${provider.toUpperCase()}_${OAUTH_START}`,
    oauth_provider: provider,
})

/**
 * Action to dispatch OAuth process success event
 * @param {string} provider Name of OAuth provider
 * @param {Record<string, string>} data Payload data from OAuth process
 */
export const endOAuthSuccess = (provider, data) => ({
    type: `${provider.toUpperCase()}_${OAUTH_SUCCESS}`,
    oauth_provider: provider,
    data,
})

/**
 * Action to dispatch OAuth process failure event
 * @param {string} provider Name of OAuth provider
 */
export const endOAuthFailure = (provider) => ({
    type: `${provider.toUpperCase()}_${OAUTH_FAILURE}`,
    oauth_provider: provider,
})
