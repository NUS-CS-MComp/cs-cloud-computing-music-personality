import lodash from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

/**
 * Component for displaying top tracks
 */
const TopTracks = ({ trackCount, trackReference, topN, focusHandler }) => {
    const trackSorted = Object.keys(trackCount)
        .slice(0, topN)
        .sort((trackA, trackB) => trackCount[trackB] - trackCount[trackA])
    const firstTrack = lodash.pullAt(trackSorted, 0)
    return (
        <div className='flex bg-background-inner rounded-md p-3 lg:flex-col'>
            <div
                className='duration-200 transition-colors mr-2 p-2 rounded max-w-36 md:max-w-40 md:max-w-none md:rounded-none lg:border-b lg:border-divider lg:pb-4 lg:flex lg:w-full lg:mr-0 hover:bg-background-inner-dark'
                onMouseEnter={() =>
                    focusHandler(trackReference[firstTrack[0]].id)
                }
                onMouseLeave={() => focusHandler(null)}
            >
                <div className='mb-2 lg:mr-2 lg:mb-0'>
                    <img
                        className='rounded w-32 lg:w-20'
                        src={trackReference[firstTrack].thumbnail}
                        alt=''
                    />
                </div>
                <div className='lg:flex lg:flex-col lg:justify-between lg:flex-1'>
                    <div className='block'>
                        <span className='uppercase font-bold text-default-white text-sm bg-spotify px-2 py-0 rounded-sm whitespace-no-wrap'>
                            Top track
                        </span>
                        <div className='text-base font-bold text-spotify duration-200 transition-opacity hover:opacity-75'>
                            <a href={trackReference[firstTrack].url}>
                                {firstTrack}
                            </a>
                        </div>
                    </div>
                    <div className='block lg:flex lg:justify-between'>
                        <div className='text-sm text-default-gray'>
                            {trackReference[firstTrack].artist}
                        </div>
                        <div className='text-sm whitespace-no-wrap text-default-gray'>
                            Streamed {trackCount[firstTrack]} times
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-1 overflow-x-auto md:h-64 md:overflow-y-auto md:block lg:flex-initial lg:w-full'>
                {trackSorted.map((trackName, index) => (
                    <div
                        key={trackName}
                        className='group duration-200 transition-colors flex flex-col flex-initial flex-shrink-0 max-w-full p-2 rounded md:max-w-none md:rounded-none md:border-b md:border-divider md:mr-0 md:w-auto md:flex-row md:justify-between md:items-end md:last:border-0 hover:bg-background-inner-dark'
                        onMouseEnter={() =>
                            focusHandler(trackReference[trackName].id)
                        }
                        onMouseLeave={() => focusHandler(null)}
                    >
                        <div className='flex flex-col md:flex-row md:items-start'>
                            <div className='self-start mb-2 md:mb-0 md:mr-3 md:self-start lg:self-center'>
                                <span className='inline-block bg-spotify rounded-full text-default-white text-xs font-bold flex w-5 h-5 justify-center items-center'>
                                    {index + 2}
                                </span>
                            </div>
                            <img
                                className='rounded mr-2 w-24 mb-2 md:mb-0 md:w-12'
                                src={trackReference[trackName].thumbnail}
                                alt=''
                            />
                            <div className='block'>
                                <div className='text-sm font-normal duration-200 transition-colors group-hover:text-spotify'>
                                    <a href={trackReference[trackName].url}>
                                        {trackName}
                                    </a>
                                </div>
                                <div className='text-xs text-default-gray'>
                                    {trackReference[trackName].artist}
                                </div>
                            </div>
                        </div>
                        <div className='text-xs text-default-gray md:whitespace-no-wrap'>
                            Streamed {trackCount[trackName]} times
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

TopTracks.propTypes = {
    /**
     * Track count data
     */
    trackCount: PropTypes.object.isRequired,
    /**
     * Track metadata reference map
     */
    trackReference: PropTypes.object.isRequired,
    /**
     * Number of tracks to display
     */
    topN: PropTypes.number,
    /**
     * Handler for focus event
     */
    focusHandler: PropTypes.func,
}

TopTracks.defaultProps = {
    topN: 10,
    focusHandler: () => {},
}

export default TopTracks
