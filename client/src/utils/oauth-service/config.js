const CALL_BACK_ROUTE = 'oauth-callback'

/**
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

export default { CALL_BACK_ROUTE, FACEBOOK_OAUTH_CONFIG, SPOTIFY_OAUTH_CONFIG }
