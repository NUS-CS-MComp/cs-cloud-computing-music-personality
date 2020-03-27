import http from './common'

/**
 * Endpoint for initiating Twitter OAuth token
 * @param {string} callbackUrl Callback URL
 */
export const twitterInitiateOAuthToken = (callbackUrl) =>
    http.post(
        `/social/twitter/oauth?callback_url=${encodeURIComponent(callbackUrl)}`
    )

/**
 * Endpoint for retrieving usable Twitter OAuth token and secret
 * @param {string} oauthToken OAuth token
 * @param {string} oauthVerifier OAuth token verifier
 */
export const twitterExchangeOAuthToken = (oauthToken, oauthVerifier) =>
    http.post(
        `/social/twitter/oauth/verify?${new URLSearchParams({
            oauth_token: oauthToken,
            oauth_verifier: oauthVerifier,
        }).toString()}`
    )

/**
 * Endpoint for exchanging access token of Reddit
 * @param {string} callbackUrl Callback URL
 * @param {string} code Code to exchange access token
 */
export const redditExchangeAccessToken = (callbackUrl, code) =>
    http.post(
        `/social/reddit/oauth?${new URLSearchParams({
            callback_url: callbackUrl,
            code,
        }).toString()}`
    )
