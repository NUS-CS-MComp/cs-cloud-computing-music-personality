import React from 'react'
import PropTypes from 'prop-types'

import Icon from '@components/Icon'

/**
 * User connection component to manage third-party connections
 */
const Connection = ({
    connections,
    expiredConnections,
    onDisconnect,
    renderRefreshComponent,
}) => (
    <div className='flex overflow-x-auto md:flex-no-wrap lg:flex-col'>
        {Object.keys(connections).map((connection) => (
            <div
                key={connection}
                className='bg-default-white w-56 mr-4 max-w-md rounded-lg flex flex-col flex-initial flex-shrink-0 sm:w-64 md:mb-3 md:w-1/3-m-4 md:max-w-none md:flex-auto md:flex-shrink-0 md:last:mr-0 lg:w-full'
            >
                <div
                    className={`bg-${connection} rounded-t-lg relative h-18 py-2`}
                >
                    <Icon
                        name={connection}
                        color='default-white'
                        className='h-8 mr-auto ml-4 object-cover'
                    />
                </div>
                <div className='p-4 bg-default-white rounded-b-lg flex flex-1 flex-col justify-start'>
                    <span
                        className={`uppercase font-bold text mb-4 text-${connection}`}
                    >
                        {connection}
                    </span>
                    <div className='mb-2'>
                        <div className='capitalize font-semibold'>ID</div>
                        <div className='overflow-auto'>
                            {connections[connection].id}
                        </div>
                    </div>
                    <div className='mb-2'>
                        <div className='capitalize font-semibold'>
                            Display Name
                        </div>
                        <div>{connections[connection].name}</div>
                    </div>
                    <div className='mt-2 text-default-white flex flex-col xl:flex-row'>
                        {expiredConnections.includes(connection) &&
                            renderRefreshComponent({ connection })}
                        <button
                            type='button'
                            className='p-2 uppercase font-bold bg-button-alert rounded duration-200 transition-opacity hover:opacity-75 xl:w-32'
                            onClick={() => onDisconnect(connection)}
                        >
                            Disconnect
                        </button>
                    </div>
                </div>
            </div>
        ))}
    </div>
)

Connection.propTypes = {
    /**
     * Connected third-party services
     */
    connections: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string,
            id: PropTypes.string,
        })
    ).isRequired,
    /**
     * Expired connection to trigger refresh action
     */
    expiredConnections: PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * Disconnect action handler
     */
    onDisconnect: PropTypes.func.isRequired,
    /**
     * Refresh component rendering function
     */
    renderRefreshComponent: PropTypes.func.isRequired,
}

export default Connection
