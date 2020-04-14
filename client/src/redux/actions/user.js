export const REQUEST_USER_INFO = 'REQUEST_USER_INFO'
export const REQUEST_USER_INFO_SUCCESS = 'REQUEST_USER_INFO_SUCCESS'
export const REQUEST_USER_INFO_FAILURE = 'REQUEST_USER_INFO_FAILURE'
export const REQUEST_USER_INFO_CANCEL = 'REQUEST_USER_INFO_CANCEL'

export const REQUEST_USER_INFO_CHANGE = 'REQUEST_USER_INFO_CHANGE'
export const REQUEST_USER_INFO_CHANGE_SUCCESS =
    'REQUEST_USER_INFO_CHANGE_SUCCESS'
export const REQUEST_USER_INFO_CHANGE_FAILURE =
    'REQUEST_USER_INFO_CHANGE_FAILURE'
export const REQUEST_USER_INFO_CHANGE_CANCEL = 'REQUEST_USER_INFO_CHANGE_CANCEL'

/**
 * Action to fetch user information
 */
export const requestUserInfo = () => ({
    type: REQUEST_USER_INFO,
})

/**
 * Action to change user profile information
 * @param {Record<string, string>} payload Information to be changed on user profile
 */
export const requestUserInfoChange = (payload) => ({
    type: REQUEST_USER_INFO_CHANGE,
    payload,
})
