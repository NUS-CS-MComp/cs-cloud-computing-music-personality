import { combineReducers } from 'redux'

import {
    REQUEST_USER_INFO,
    REQUEST_USER_INFO_SUCCESS,
    REQUEST_USER_INFO_FAILURE,
    REQUEST_USER_INFO_CANCEL,
    REQUEST_USER_INFO_CHANGE,
    REQUEST_USER_INFO_CHANGE_SUCCESS,
    REQUEST_USER_INFO_CHANGE_FAILURE,
    REQUEST_USER_INFO_CHANGE_CANCEL,
} from '@redux/actions/user'
import genericAPIReducer from '@redux/reducers/fetch'

export const userInfoReducer = genericAPIReducer([
    REQUEST_USER_INFO,
    REQUEST_USER_INFO_SUCCESS,
    REQUEST_USER_INFO_FAILURE,
    REQUEST_USER_INFO_CANCEL,
])

export const userProfileChangeReducer = genericAPIReducer([
    REQUEST_USER_INFO_CHANGE,
    REQUEST_USER_INFO_CHANGE_SUCCESS,
    REQUEST_USER_INFO_CHANGE_FAILURE,
    REQUEST_USER_INFO_CHANGE_CANCEL,
])

export default combineReducers({
    info: userInfoReducer,
    update: userProfileChangeReducer,
})
