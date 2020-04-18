import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { requestUserInfo } from '@redux/actions/user'
import { userInfoSelector } from '@redux/selectors/user'
import { validityIdentifierSelector } from '@redux/selectors/validate'

/**
 * Simple hook wrapper to load user profile info for different containers
 * @returns {[boolean, Record<string, string>, function]} Data to be consumed by containers
 */
const useUserInfo = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(validityIdentifierSelector)
    const userInfo = useSelector(userInfoSelector)
    const dispatchCallback = useCallback(() => {
        if (isLoggedIn) {
            dispatch(requestUserInfo())
        }
    }, [isLoggedIn, dispatch])
    return [isLoggedIn, userInfo, dispatchCallback]
}

export default useUserInfo
