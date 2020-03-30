import http from './common'

/**
 * Endpoint to get user session validation status
 * @param {string} provider Optional OAuth provider name
 */
export const getUserValidationStatus = (provider = null) => {
    if (provider === null) return http.post(`user/authenticate`)
    return http.post(`user/authenticate`, { provider })
}
