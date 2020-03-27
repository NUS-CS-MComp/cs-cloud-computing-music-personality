/**
 * Include all configuration for OAuth providers
 * Configuration should end with suffix OAUTH_CONFIG to be parsed by OAuth factory class
 */

/**
 * Default route name for OAuth callback handling page
 */
const CALL_BACK_ROUTE = 'oauth-callback'

/**
 * Edit settings at https://developers.facebook.com/apps/
 * @type {import("./config").IOAuthConfig}
 */
const FACEBOOK_OAUTH_CONFIG = {
    providerName: 'facebook',
    oauthURL: 'https://www.facebook.com/v6.0/dialog/oauth',
    params: {
        clientID: '254765705559494',
        responseType: 'token',
        scope: 'user_posts',
        display: 'popup',
    },
    search: ['access_token'],
}

/**
 * Edit settings at https://www.reddit.com/prefs/apps
 * @type {import("./config").IOAuthConfig}
 */
const REDDIT_OAUTH_CONFIG = {
    providerName: 'reddit',
    oauthURL: 'https://www.reddit.com/api/v1/authorize.compact',
    params: {
        clientID: 'hukLgrU7OZvTSQ',
        duration: 'temporary',
        responseType: 'code',
        scope: 'identity,history,read',
    },
    search: ['code'],
}

/**
 * Edit settings at https://developer.spotify.com/dashboard/
 * @type {import("./config").IOAuthConfig}
 */
const SPOTIFY_OAUTH_CONFIG = {
    providerName: 'spotify',
    oauthURL: 'https://accounts.spotify.com/authorize',
    params: {
        clientID: '98bcc1d17d5c463fb731ac9e9542cad9',
        responseType: 'token',
        scope: 'user-read-recently-played',
    },
    search: ['access_token'],
}

/**
 * Edit settings at https://developer.twitter.com/en/dashboard
 * @type {import("./config").IOAuthConfig}
 */
const TWITTER_OAUTH_CONFIG = {
    providerName: 'twitter',
    oauthURL: 'https://api.twitter.com/oauth/authenticate',
    search: ['oauth_token', 'oauth_verifier'],
    resolveMap: {},
}

export default {
    CALL_BACK_ROUTE,
    FACEBOOK_OAUTH_CONFIG,
    REDDIT_OAUTH_CONFIG,
    SPOTIFY_OAUTH_CONFIG,
    TWITTER_OAUTH_CONFIG,
}
