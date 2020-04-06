import React from 'react'
import PropTypes from 'prop-types'

import RecentHistory from '@components/SpotifyResource/RecentHistory'

/**
 * Component for rendering list of Spotify listening history
 */
const RecentHistoryList = ({ data }) => (
    <div className='overflow-x-auto text-left flex flex-no-wrap md:overflow-x-hidden md:flex-wrap md:max-h-screen'>
        {data.map((track) => (
            <RecentHistory key={`${track.id}_${track.time}`} data={track} />
        ))}
    </div>
)

RecentHistoryList.propTypes = {
    /**
     * List of recent play history data
     */
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            artist: PropTypes.string,
            time: PropTypes.number,
            url: PropTypes.string,
            thumbnail: PropTypes.string,
        })
    ).isRequired,
}

export default RecentHistoryList
