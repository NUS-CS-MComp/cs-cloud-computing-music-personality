import { createStore, combineReducers } from 'redux';
import { spotifyAccessToken, fbAccessToken, fbUserId } from './actions/reducer';

export default createStore(
    combineReducers({
        spotifyAccessToken: spotifyAccessToken,
        fbAccessToken: fbAccessToken,
        fbUserId: fbUserId,
    }),
);
