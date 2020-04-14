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
