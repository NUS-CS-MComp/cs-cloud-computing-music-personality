import lodash from 'lodash'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import EmptyData from '@components/EmptyData'
import Heading from '@components/Heading'
import UserConnection from '@components/UserResource/Connection'
import { disconnectProvider } from '@redux/actions/user'
import { userConnectionSelector } from '@redux/selectors/user'

/**
 * User connection container for visualizing current active connections
 */
export default () => {
    const dispatch = useDispatch()
    const connections = useSelector(userConnectionSelector)
    return (
        <div className='h-full text-left flex flex-col'>
            <Heading
                text='Connections'
                subheading='Your current connected platforms'
            />
            {lodash.isEmpty(connections) ? (
                <EmptyData
                    message='You are not logged in'
                    icon='login'
                    iconClassName='h-10'
                />
            ) : (
                <UserConnection
                    connections={connections}
                    onDisconnect={(provider) =>
                        dispatch(disconnectProvider(provider))
                    }
                />
            )}
        </div>
    )
}
