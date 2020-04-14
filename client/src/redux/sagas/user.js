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
import genericAPISaga from '@redux/sagas/fetch'
import Api from '@services/api'

export const userInfoSaga = genericAPISaga(Api.user.getUserInfo, [
    REQUEST_USER_INFO,
    REQUEST_USER_INFO_SUCCESS,
    REQUEST_USER_INFO_FAILURE,
    REQUEST_USER_INFO_CANCEL,
])

export const userProfileChangeSaga = genericAPISaga(
    Api.user.updateUserProfile,
    [
        REQUEST_USER_INFO_CHANGE,
        REQUEST_USER_INFO_CHANGE_SUCCESS,
        REQUEST_USER_INFO_CHANGE_FAILURE,
        REQUEST_USER_INFO_CHANGE_CANCEL,
    ]
)
