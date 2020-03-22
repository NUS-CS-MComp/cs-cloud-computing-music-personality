import { createStore, combineReducers } from 'redux'
import { spotifyAccessToken, fbAccessToken, fbUserId } from './reducers/reducer'

export default createStore(
    combineReducers({
        spotifyAccessToken,
        fbAccessToken,
        fbUserId,
    })
)
