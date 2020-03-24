import lodash from 'lodash'

import { OAUTH_SUCCESS, OAUTH_FAILURE, OAUTH_START } from '../actions/oauth'

const oauthKey = 'oauth.tokens'
const oauthToken = localStorage.getItem(oauthKey)

/**
 * Reducer for OAuth request handling
 * @param {any} state OAuth reducer state object, by default read from local storage
 * @param {{ type: string, provider: string, data: any}} action Action type and payload data for OAuth process
 */
export default function oauthReducer(
    state = oauthToken ? JSON.parse(oauthToken) : {},
    { type, provider, ...data }
) {
    switch (type) {
        case OAUTH_START:
            localStorage.setItem(
                oauthKey,
                JSON.stringify({ ...state, [provider]: null })
            )
            return { ...state, [provider]: null }
        case OAUTH_SUCCESS:
            localStorage.setItem(
                oauthKey,
                JSON.stringify({ ...state, [provider]: data })
            )
            return { ...state, [provider]: data }
        case OAUTH_FAILURE:
            localStorage.setItem(
                oauthKey,
                JSON.stringify(lodash.omit(state, provider))
            )
            return lodash.omit(state, provider)
        default:
            return state
    }
}
