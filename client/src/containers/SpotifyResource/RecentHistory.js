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
        <div className='flex flex-col'>
            <div className='flex items-center justify-between'>
                <Heading text='Play History' />
                <button type='button' onClick={() => loadData()}>
                    <Icon name='refresh' className='fill-current' />
                </button>
            </div>
            {data.length > 0 ? (
                <SpotifyResource.RecentHistoryList data={data} />
            ) : (
                <EmptyData
                    message='Login to Spotify to view'
                    icon='music-note'
                    iconClassName='h-10'
                />
            )}
        </div>
    )
}
