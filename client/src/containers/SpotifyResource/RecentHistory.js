import React, { useEffect } from 'react'

import EmptyData from '@components/EmptyData'
import Heading from '@components/Heading'
import Icon from '@components/Icon'
import SpotifyResource from '@components/SpotifyResource'
import useSpotifyResource from '@hooks/use-spotify-resource'

/**
 * Container component for Spotify play history
 */
export default () => {
    const [data, , , , loadData] = useSpotifyResource('recent')
    useEffect(() => {
        loadData()
    }, [loadData])
    return (
        <div className='md:flex md:flex-col md:max-h-full md:min-h-full'>
            <div className='flex items-center justify-between text-default-black'>
                <Heading
                    text='Play History'
                    subheading='Your most recent 20 tracks'
                />
                <button type='button' onClick={() => loadData()}>
                    <Icon name='refresh' className='h-6 fill-current' />
                </button>
            </div>
            {data.length > 0 ? (
                <SpotifyResource.RecentHistoryList data={data} />
            ) : (
                <EmptyData
                    message='Connect to Spotify to view'
                    icon='music-note'
                    iconClassName='h-10'
                />
            )}
        </div>
    )
}
