import { createSelector } from 'reselect'

import OAUTH_CONFIG from '@services/oauth/config'

/**
 * Selector for all session validation status
 * @param {Record<string, string>} state Store state
 */
export const validitySelector = (state) => state.validate

/**
 * Selector for identifying user login session by identifier
 */
export const validityIdentifierSelector = createSelector(
    validitySelector,
    (state) => typeof state.identifier !== 'undefined'
)

/**
 * Selector for specific provider token validity
 * @param {string} provider Name of OAuth provider
 */
export const providerValiditySelector = (provider) => (state) =>
    validitySelector(state)[provider]

/**
 * Selector function passed to composed selector to filter providers based on authentication status
 * @param {boolean} authenticated Authentication status boolean flag
 */
export const providersByAuthStatusSelector = (authenticated) => (status) =>
    Object.keys(status)
        .reduce((acc, tokenProvider) => {
            if (typeof status[tokenProvider].authenticated !== 'undefined') {
                if (
                    status[tokenProvider].authenticated === authenticated &&
                    !status[tokenProvider].expired
                ) {
                    return [...acc, tokenProvider]
                }
            }
            return acc
        }, [])
        .sort((providerNameA, providerNameB) => providerNameA - providerNameB)

/**
 * Selector function passed to composed selector to filter out social media resource providers
 * @param {string[]} providers Provider name string array
 */
export const socialProviderSelector = (providers) =>
    providers.filter(
        (provider) =>
            provider !== OAUTH_CONFIG.SPOTIFY_OAUTH_CONFIG.providerName
    )

/**
 * Selector for available providers with valid token status
 */
export const availableProviderSelector = createSelector(
    validitySelector,
    providersByAuthStatusSelector(true)
)

/**
 * Selector for providers with invalid token status
 */
export const unavailableProviderSelector = createSelector(
    validitySelector,
    providersByAuthStatusSelector(false)
)

/**
 * Selector for available providers from social media
 */
export const availableSocialProviderSelector = createSelector(
    availableProviderSelector,
    socialProviderSelector
)

/**
 * Selector for providers to be authenticated via social media
 */
export const unavailableSocialProviderSelector = createSelector(
    unavailableProviderSelector,
    socialProviderSelector
)

/**
 * Selector function passed to composed selector to filter providers based on expiration status
 */
export const providersByExpiryStatusSelector = (status) =>
    Object.keys(status)
        .reduce((acc, tokenProvider) => {
            if (typeof status[tokenProvider].expired !== 'undefined') {
                if (status[tokenProvider].expired) {
                    return [...acc, tokenProvider]
                }
            }
            return acc
        }, [])
        .sort((providerNameA, providerNameB) => providerNameA - providerNameB)

/**
 * Selector function to select providers with expired status
 */
export const expiredProviderSelector = createSelector(
    validitySelector,
    providersByExpiryStatusSelector
)

/**
 * Selector function for all valid providers with authenticated or expired status
 */
export const validProviderSelector = createSelector(
    [expiredProviderSelector, availableProviderSelector],
    (expiredProvider, availableProvider) => [
        ...expiredProvider,
        ...availableProvider,
    ]
)
