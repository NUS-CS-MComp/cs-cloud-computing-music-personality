import React, { useEffect } from 'react'

import Heading from '@components/Heading'
import Icon from '@components/Icon'
import InsightsResource from '@components/InsightsResource'
import useSpotifyResource from '@hooks/use-spotify-resource'

/**
 * Container for Spotify track audio features
 */
export default () => {
    const [data, , , , loadData] = useSpotifyResource('recent-features')

    useEffect(() => {
        if (data.length <= 0) {
            loadData()
        }
    }, [data, loadData])

    return (
        <div className='h-full'>
            <div className='flex items-center justify-between text-default-black'>
                <Heading
                    text='Audio Features'
                    subheading='Extracted features from your recent tracks'
                />
                <button type='button' onClick={() => loadData()}>
                    <Icon name='refresh' className='h-6 fill-current' />
                </button>
            </div>
            {data.length > 0 && (
                <InsightsResource.AudioFeature features={data} />
            )}
        </div>
    )
}
