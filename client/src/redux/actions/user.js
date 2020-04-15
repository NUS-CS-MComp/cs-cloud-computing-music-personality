import { getFetchResourceActionList } from '@redux/actions/fetch'

export const REQUEST_USER_INFO_ACTIONS = getFetchResourceActionList('USER_INFO')
export const REQUEST_USER_INFO_CHANGE_ACTIONS = getFetchResourceActionList(
    'USER_INFO_CHANGE'
)
export const DISCONNECT_PROVIDER_ACTIONS = getFetchResourceActionList(
    'PROVIDER_DISCONNECT'
)
export const USER_LOGOUT_ACTIONS = getFetchResourceActionList('USER_LOGOUT')

/**
 * Action to fetch user information
 */
export const requestUserInfo = () => ({
    type: REQUEST_USER_INFO_ACTIONS[0],
})

/**
 * Action to change user profile information
 * @param {Record<string, string>} payload Information to be changed on user profile
 */
export const requestUserInfoChange = (payload) => ({
    type: REQUEST_USER_INFO_CHANGE_ACTIONS[0],
    payload,
})

/**
 * Action to disconnect from provider
 * @param {string} provider Name of platform provider
 */
export const disconnectProvider = (provider) => ({
    type: DISCONNECT_PROVIDER_ACTIONS[0],
    payload: provider,
})

/**
 * Action to perform logout action
 */

export const logoutUser = () => ({
    type: USER_LOGOUT_ACTIONS[0],
})
