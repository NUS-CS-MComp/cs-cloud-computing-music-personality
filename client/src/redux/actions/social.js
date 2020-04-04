export const FETCH_SOCIAL_POST_INIT = 'FETCH_SOCIAL_POST_INIT'
export const FETCH_SOCIAL_POST_CANCEL = 'FETCH_SOCIAL_POST_CANCEL'
export const FETCH_SOCIAL_POST_FAILURE = 'FETCH_SOCIAL_POST_FAILURE'
export const FETCH_SOCIAL_POST_SUCCESS = 'FETCH_SOCIAL_POST_SUCCESS'

/**
 * Action to start fetching social posts resources
 * @param {string} provider Name of social platform provider
 */
export const startFetchSocialPosts = (provider) => ({
    type: FETCH_SOCIAL_POST_INIT,
    provider,
})
