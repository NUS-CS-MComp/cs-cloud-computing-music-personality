import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Icon from '@/components/Icon'
import toCamelCase from '@utils/camel-case'

/**
 * Component for individual social media post data
 */
const SocialPost = ({ message, time, provider }) => (
    <div className='bg-white h-56 w-auto max-w-md mr-4 p-4 rounded-lg flex flex-col flex-initial flex-grow-0 flex-shrink-0 md:h-auto md:min-w-full md:mb-4 last:md:mb-0'>
        <div className='flex flex-col justify-between md:flex-row md:items-end'>
            <span>
                <Icon name={provider} />
            </span>
            <span className='text-gray-600 text-sm'>
                You posted on {toCamelCase(provider)} at{' '}
                {moment.unix(time).format('h:mm:ss a, MMM YYYY')}
            </span>
        </div>
        <hr className='my-2' />
        <div className='overflow-y-auto flex-auto'>{message}</div>
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
    time: PropTypes.string,
    /**
     * Provider name
     */
    provider: PropTypes.string,
}

export default SocialPost
