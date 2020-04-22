import { createSelector } from 'reselect'

/**
 * Selector for all provider tokens
 * @param {Record<string, string>} state Store state
 */
export const tokenSelector = (state) => state.oauth

/**
 * Selector for provider token
 * @param {string} provider Name of OAuth provider
 */
export const providerTokenSelector = (provider) => (state) =>
    tokenSelector(state)[provider]

/**
 * Composed selector for checking provider status
 */
export const providerStatusSelector = createSelector(tokenSelector, (tokens) =>
    Object.keys(tokens).reduce(
        (acc, tokenProvider) =>
            Object.assign(acc, {
                [tokenProvider]: tokens[tokenProvider].completed,
            }),
        {}
    )
)
