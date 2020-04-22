import React from 'react'
import { useDispatch } from 'react-redux'

import Icon from '@components/Icon'
import { logoutUser } from '@redux/actions/user'

/**
 * Logout handler container
 */
export default () => {
    const dispatch = useDispatch()
    return (
        <button
            className='flex rounded md:bg-default-white group'
            type='button'
            onClick={() => dispatch(logoutUser())}
        >
            <span className='duration-200 p-2 transition-opacity md:group-hover:opacity-75'>
                <Icon name='logout' className='h-6' />
            </span>
        </button>
    )
}
