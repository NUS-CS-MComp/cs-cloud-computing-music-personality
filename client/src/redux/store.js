import { createStore, combineReducers } from 'redux'
import { spotifyAccessToken, fbAccessToken, fbUserId } from './reducer'

export default createStore(
    combineReducers({
        spotifyAccessToken,
        fbAccessToken,
        fbUserId,
    })
)
