import { combineReducers } from 'redux'

import OAuthServiceFactory from '@services/oauth/factory'

import { OAUTH_SUCCESS, OAUTH_FAILURE, OAUTH_START } from '../actions/oauth'

/**
 * Helper function to create multiple OAuth reducers
 * @param {string} providerName Name string of OAuth provider
 */
const createOAuthReducer = (providerName) => {
    const oauthKey = `spotlight.oauth.token.${providerName}`
    const oauthToken = localStorage.getItem(oauthKey)
    const providerNameUpper = providerName.toUpperCase()
    /**
     * Reducer for OAuth request handling
     * @param {Record<string, string>} state OAuth reducer state object, by default read from local storage
     * @param {{ type: string, provider: string, data: any}} action Action type and payload data for OAuth process
     */
    return (
        state = oauthToken ? JSON.parse(oauthToken) : {},
        { type, provider, ...data }
    ) => {
        switch (type) {
            case `${providerNameUpper}_${OAUTH_START}`:
                localStorage.setItem(oauthKey, JSON.stringify({}))
                return {}
            case `${providerNameUpper}_${OAUTH_SUCCESS}`:
                localStorage.setItem(
                    oauthKey,
                    JSON.stringify({ ...state, ...data })
                )
                return { ...state, ...data }
            case `${providerNameUpper}_${OAUTH_FAILURE}`:
                localStorage.removeItem(oauthKey)
                return undefined
            default:
                return state
        }
    }
}

export default combineReducers(
    Object.fromEntries(
        OAuthServiceFactory.OAuthServices.map((name) => [
            name,
            createOAuthReducer(name),
        ])
    )
)
