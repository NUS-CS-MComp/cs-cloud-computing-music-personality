import { createSelector } from 'reselect'

import OAUTH_CONFIG from '@services/oauth/config'

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

/**
 * Selector for available providers with valid token status
 */
export const availableProviderSelector = createSelector(
    validitySelector,
    (status) =>
        Object.keys(status)
            .reduce((acc, tokenProvider) => {
                if (status[tokenProvider].authenticated) {
                    return [...acc, tokenProvider]
                }
                return acc
            }, [])
            .sort(
                (providerNameA, providerNameB) => providerNameA - providerNameB
            )
)

/**
 * Selector for available providers from social media
 */
export const availableSocialProviderSelector = createSelector(
    availableProviderSelector,
    (providers) =>
        providers.filter(
            (provider) =>
                provider !== OAUTH_CONFIG.SPOTIFY_OAUTH_CONFIG.providerName
        )
)
