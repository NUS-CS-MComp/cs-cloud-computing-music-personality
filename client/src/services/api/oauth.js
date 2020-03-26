import http from './common'

/**
 * Endpoint for initiating Twitter OAuth token
 * @param {string} callbackUrl
 */
export const twitterInitiateOAuthToken = (callbackUrl) =>
    http.post(
        `/social/twitter/oauth?callback-url=${encodeURIComponent(callbackUrl)}`
    )

/**
 * Endpoint for retrieving usable Twitter OAuth token and secret
 * @param {string} oauthToken
 * @param {string} oauthSecret
 */
export const twitterExchangeOAuthToken = (oauthToken, oauthSecret) =>
    http.post(
        `/social/twitter/oauth/verify?${new URLSearchParams({
            oauth_token: oauthToken,
            oauth_secret: oauthSecret,
        }).toString()}`
    )

/**
 * Endpoint for exchanging access token of Reddit
 * @param {string} callbackUrl
 * @param {string} code
 */
export const redditExchangeAccessToken = (callbackUrl, code) =>
    http.post(
        `/social/reddit/oauth?${new URLSearchParams({
            callback_url: callbackUrl,
            code,
        }).toString()}`
    )
