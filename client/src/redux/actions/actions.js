export const ADD_SPOTIFY_ACCESS_TOKEN = 'ADD_SPOTIFY_ACCESS_TOKEN'
export const ADD_FB_ACCESS_TOKEN = 'ADD_FB_ACCESS_TOKEN'
export const ADD_FB_USER_ID = 'ADD_FB_USER_ID'

export const addSpotifyAccessToken = (payload) => ({
    type: ADD_SPOTIFY_ACCESS_TOKEN,
    payload,
})

export const addFBAccessToken = (payload) => ({
    type: ADD_FB_ACCESS_TOKEN,
    payload,
})

export const addFBUserId = (payload) => ({ type: ADD_FB_USER_ID, payload })
