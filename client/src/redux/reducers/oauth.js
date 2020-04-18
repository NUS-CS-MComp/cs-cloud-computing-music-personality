import { combineReducers } from 'redux'

import OAuthServiceFactory from '@services/oauth/factory'

import {
    OAUTH_CANCEL,
    OAUTH_CLEAR,
    OAUTH_COMPLETE,
    OAUTH_FAILURE,
    OAUTH_INIT,
    OAUTH_PROCESS_SUCCESS,
    OAUTH_PROCESS_FAILURE,
} from '@redux/actions/oauth'

/**
 * Helper function to create multiple OAuth reducers
 * @param {string} providerName Name string of OAuth provider
 */
const createOAuthReducer = (providerName) => {
    const providerNameUpper = providerName.toUpperCase()
    /**
     * Reducer for OAuth request handling
     * @param {Record<string, string>} state OAuth reducer state object, by default read from local storage
     * @param {{ type: string, provider: string, data: any}} action Action type and payload data for OAuth process
     */
    return (state = {}, { type, provider, ...data }) => {
        switch (type) {
            case `${providerNameUpper}_${OAUTH_CANCEL}`:
                return {
                    cancelled: true,
                }
            case `${providerNameUpper}_${OAUTH_CLEAR}`:
                return { cleared: true }
            case `${providerNameUpper}_${OAUTH_COMPLETE}`:
                return {
                    completed: true,
                }
            case `${providerNameUpper}_${OAUTH_FAILURE}`:
                return { failed: true }
            case `${providerNameUpper}_${OAUTH_INIT}`:
                return { loading: true }
            case `${providerNameUpper}_${OAUTH_PROCESS_SUCCESS}`:
                return { process_data: data }
            case `${providerNameUpper}_${OAUTH_PROCESS_FAILURE}`:
                return { failed: true }
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
