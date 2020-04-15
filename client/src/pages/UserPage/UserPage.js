import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import UserResource from '@containers/UserResource'
import { requestUserInfo } from '@redux/actions/user'
import { validitySelector } from '@redux/selectors/validate'

/**
 * User information management page container
 */
export default () => {
    const dispatch = useDispatch()
    const verification = useSelector(validitySelector)

    useEffect(() => {
        if (verification && verification.identifier) {
            dispatch(requestUserInfo())
        }
    }, [dispatch])

    return (
        <div className='h-full text-left flex flex-col lg:grid lg:grid-cols-6'>
            <div className='my-2 flex-1 md:flex-initial lg:col-span-4 lg:mr-8 lg:my-0'>
                <UserResource.Profile />
            </div>
            <div className='flex-1 mb-4 md:mb-0 md:overflow-y-auto lg:col-span-2'>
                <UserResource.Connection />
            </div>
        </div>
    )
}
