import { combineReducers } from 'redux'

import {
    REQUEST_USER_INFO_ACTIONS,
    REQUEST_USER_INFO_CHANGE_ACTIONS,
    DISCONNECT_PROVIDER_ACTIONS,
} from '@redux/actions/user'
import genericAPIReducer from '@redux/reducers/fetch'

export const userInfoReducer = genericAPIReducer(REQUEST_USER_INFO_ACTIONS)

export const userProfileChangeReducer = genericAPIReducer(
    REQUEST_USER_INFO_CHANGE_ACTIONS
)

export const disconnectProviderReducer = genericAPIReducer(
    DISCONNECT_PROVIDER_ACTIONS
)

export default combineReducers({
    info: userInfoReducer,
    update: userProfileChangeReducer,
    disconnect: disconnectProviderReducer,
})
