import lodash from 'lodash'
import { createSelector } from 'reselect'

/**
 * Selector for all provider tokens
 * @param {Record<string, string>} state
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
    Object.keys(tokens).reduce((acc, tokenProvider) => {
        if (lodash.isEqual(tokens[tokenProvider], {})) return acc
        return Object.assign(acc, { [tokenProvider]: true })
    }, {})
)
