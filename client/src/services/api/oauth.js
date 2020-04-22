import http from './common'

const BASE_OAUTH_PATH = '/oauth'

/**
 * Endpoint for exchanging access token for OAuth 2.0 process
 * @param {string} provider OAuth provider name
 * @param {string} callbackUrl Callback URL
 * @param {string} code Code to exchange access token
 */
export const genericOAuthExchangeAccessToken = (provider, callbackUrl, code) =>
    http.post(
        `${BASE_OAUTH_PATH}/${provider}?${new URLSearchParams({
            callback_url: callbackUrl,
            code,
        }).toString()}`
    )

/**
 * Endpoint for initiating Twitter OAuth token
 * @param {string} callbackUrl Callback URL
 */
export const twitterInitiateOAuthToken = (callbackUrl) =>
    http.post(
        `${BASE_OAUTH_PATH}/twitter/init?callback_url=${encodeURIComponent(
            callbackUrl
        )}`
    )

/**
 * Endpoint for retrieving usable Twitter OAuth token and secret
 * @param {string} oauthToken OAuth token
 * @param {string} oauthVerifier OAuth token verifier
 */
export const twitterExchangeOAuthToken = (oauthToken, oauthVerifier) =>
    http.post(
        `${BASE_OAUTH_PATH}/twitter/verify?${new URLSearchParams({
            oauth_token: oauthToken,
            oauth_verifier: oauthVerifier,
        }).toString()}`
    )
