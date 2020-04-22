import lodash from 'lodash'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import EmptyData from '@components/EmptyData'
import Heading from '@components/Heading'
import UserConnection from '@components/UserResource/Connection'
import OAuthLogin from '@containers/OAuthSection/OAuthLogin'
import { disconnectProvider } from '@redux/actions/user'
import { userConnectionSelector } from '@redux/selectors/user'
import { expiredProviderSelector } from '@redux/selectors/validate'

/**
 * User connection container for visualizing current active connections
 */
export default () => {
    const dispatch = useDispatch()
    const connections = useSelector(userConnectionSelector)
    const expiredConnections = useSelector(expiredProviderSelector)
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
                    expiredConnections={expiredConnections}
                    onDisconnect={(provider) =>
                        dispatch(disconnectProvider(provider))
                    }
                    renderRefreshComponent={({ connection }) => (
                        <OAuthLogin
                            provider={connection}
                            render={({ onClick }) => (
                                <button
                                    type='button'
                                    className='mb-2 p-2 uppercase font-bold bg-button-alert-secondary rounded duration-200 transition-opacity hover:opacity-75 xl:w-40 xl:mb-0 xl:mr-2'
                                    onClick={onClick}
                                >
                                    Refresh Token
                                </button>
                            )}
                        />
                    )}
                />
            )}
        </div>
    )
}
