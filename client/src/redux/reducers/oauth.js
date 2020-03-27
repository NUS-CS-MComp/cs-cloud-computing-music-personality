import lodash from 'lodash'
import { combineReducers } from 'redux'

import OAuthServiceFactory from '@services/oauth/factory'

import {
    OAUTH_CANCEL,
    OAUTH_COMPLETE,
    OAUTH_FAILURE,
    OAUTH_INIT,
    OAUTH_PROCESS_SUCCESS,
    OAUTH_PROCESS_FAILURE,
} from '../actions/oauth'

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
                    ...lodash.omit(state, 'is_loading'),
                }
            case `${providerNameUpper}_${OAUTH_COMPLETE}`:
                return {
                    ...lodash.omit(state, ['is_loading', 'process_data']),
                    final_data: data,
                }
            case `${providerNameUpper}_${OAUTH_FAILURE}`:
                return null
            case `${providerNameUpper}_${OAUTH_INIT}`:
                return { ...state, is_loading: true }
            case `${providerNameUpper}_${OAUTH_PROCESS_SUCCESS}`:
                return { ...state, process_data: data }
            case `${providerNameUpper}_${OAUTH_PROCESS_FAILURE}`:
                return null
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
