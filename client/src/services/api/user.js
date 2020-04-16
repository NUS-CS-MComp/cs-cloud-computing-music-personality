import http from './common'

/**
 * Endpoint to get user session validation status
 * @param {string} provider Optional OAuth provider name
 */
export const getUserValidationStatus = (provider = null) => {
    if (provider === null) return http.post(`user/authenticate`)
    return http.post(`user/authenticate`, { provider })
}

/**
 * Endpoint to get user information
 */
export const getUserInfo = () => http.get(`user/me`)

/**
 * Endpoint to change user profile information
 * @param {Record<string, string>} payload Information to be changed on user profile
 */
export const updateUserProfile = (payload) => http.post(`user/me`, payload)

/**
 * Endpoint to disconnect provider session
 * @param {string} provider OAuth provider name
 */
export const removeUserConnection = (provider) =>
    http.delete(
        `user/me?${new URLSearchParams({
            provider,
        }).toString()}`
    )

/**
 * Endpoint to logout user
 */
export const logoutUser = () => http.post(`user/logout`)

/**
 * Endpoint to delete user
 */
export const deleteUser = () => http.delete('user/me')
