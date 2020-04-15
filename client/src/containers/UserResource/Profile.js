import lodash from 'lodash'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import EmptyData from '@components/EmptyData'
import Heading from '@components/Heading'
import UserProfile from '@components/UserResource/Profile'
import { requestUserInfoChange } from '@redux/actions/user'
import { userProfileSelector } from '@redux/selectors/user'

/**
 * User profile container for fetching user related contents
 */
export default () => {
    const dispatch = useDispatch()
    const userProfile = useSelector(userProfileSelector)
    return (
        <div className='h-full text-left flex flex-col'>
            <div className='flex items-center justify-between text-default-black'>
                <Heading
                    text='My Profile'
                    subheading='Your basic information'
                />
            </div>
            {lodash.isEmpty(userProfile) ? (
                <EmptyData
                    message='You are not logged in'
                    icon='login'
                    iconClassName='h-10'
                />
            ) : (
                <UserProfile
                    id={userProfile.user_id}
                    sid={userProfile.sid}
                    profile={userProfile.profile}
                    timestamp={userProfile.created_at}
                    onChangeCommit={(data) => {
                        if (!lodash.isEmpty(data)) {
                            dispatch(requestUserInfoChange(data))
                        }
                    }}
                />
            )}
        </div>
    )
}
