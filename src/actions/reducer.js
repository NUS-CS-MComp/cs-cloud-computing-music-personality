import { ADD_SPOTIFY_ACCESS_TOKEN, ADD_FB_ACCESS_TOKEN, ADD_FB_USER_ID } from './actions';

export const spotifyAccessToken = (state = null, action) => {
    if (action.type === ADD_SPOTIFY_ACCESS_TOKEN) {
        return action.payload;
    }
    return state;
};

export const fbAccessToken = (state = null, action) => {
    if (action.type === ADD_FB_ACCESS_TOKEN) {
        return action.payload;
    }
    return state;
};

export const fbUserId = (state = null, action) => {
    if (action.type === ADD_FB_USER_ID) {
        return action.payload;
    }
    return state;
};
