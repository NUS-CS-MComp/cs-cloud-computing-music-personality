import React from 'react'
import PropTypes from 'prop-types'

import Icon from '@components/Icon'
import formatTimeStamp from '@utils/format-unix-time'

/**
 * Component for rendering Spotify listening history
 */
const RecentHistory = ({ data }) => (
    <div className='bg-white w-48 max-w-md mr-4 rounded-lg flex flex-col flex-initial flex-shrink-0 md:mb-4 md:w-full md:max-w-full md:items-center lg:p-4 lg:flex-row lg:items-start'>
        <img
            className='h-48 object-cover rounded-t-lg md:w-full lg:w-auto lg:object-left lg:h-20 lg:mr-4 lg:rounded-none'
            src={data.thumbnail}
            alt=''
        />
        <hr className='border-1 border-secondary-500 md:hidden' />
        <div className='p-4 h-full flex flex-col justify-start md:w-full md:h-auto lg:p-0'>
            <div className='text-xs text-gray-600'>{data.artist}</div>
            <div className='flex flex-row justify-between items-start md:items-center'>
                <div className='text-spotify'>
                    <div className='font-bold text-base'>{data.name}</div>
                </div>
                <a className='text-spotify md:ml-4' href={data.url}>
                    <Icon name='play' />
                </a>
            </div>
            <div className='text-gray-600 text-sm mt-auto'>
                Streamed on {formatTimeStamp(data.time)}
            </div>
        </div>
    </div>
)

RecentHistory.propTypes = {
    /**
     * Recent play history data
     */
    data: PropTypes.shape({
        name: PropTypes.string,
        artist: PropTypes.string,
        time: PropTypes.number,
        url: PropTypes.string,
        thumbnail: PropTypes.string,
    }).isRequired,
}

export default RecentHistory
