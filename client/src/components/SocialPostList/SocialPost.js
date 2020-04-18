import React from 'react'
import PropTypes from 'prop-types'

import Icon from '@components/Icon'
import toCamelCase from '@utils/camel-case'
import formatTimeStamp from '@utils/format-unix-time'

/**
 * Component for individual social media post data
 */
const SocialPost = ({ message, time, provider }) => (
    <div className='bg-default-white h-56 w-64 mr-4 p-4 rounded-lg flex flex-col flex-initial flex-shrink-0 sm:w-auto sm:max-w-md md:h-auto md:min-w-full md:max-w-full md:mb-4'>
        <div className='flex flex-col justify-between md:flex-row md:items-center'>
            <span className='mr-2'>
                <Icon name={provider} className='h-6' />
            </span>
            <span className='text-default-gray text-sm'>
                You posted {formatTimeStamp(time)} on {toCamelCase(provider)}
            </span>
        </div>
        <hr className='my-2 border-line' />
        <div className='text-default-black overflow-y-auto flex-auto text-base'>
            {message}
        </div>
    </div>
)

SocialPost.propTypes = {
    /**
     * Message text
     */
    message: PropTypes.string,
    /**
     * Epoch timestamp
     */
    time: PropTypes.number,
    /**
     * Provider name
     */
    provider: PropTypes.string,
}

export default SocialPost
