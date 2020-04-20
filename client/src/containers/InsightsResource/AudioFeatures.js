import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import EmptyData from '@components/EmptyData'
import Heading from '@components/Heading'
import Icon from '@components/Icon'
import InsightsResource from '@components/InsightsResource'
import useSpotifyResource from '@hooks/use-spotify-resource'
import { spotifyAudioFeaturesSelector } from '@redux/selectors/spotify'

/**
 * Container for Spotify track audio features
 */
export default () => {
    const [data, , , isLoading, loadData] = useSpotifyResource(
        'recent-features'
    )
    const {
        features,
        tracks,
        mean,
        mean_normalized: meanNormalized,
    } = useSelector(spotifyAudioFeaturesSelector)

    useEffect(() => {
        if (data.length <= 0 && !isLoading) {
            loadData()
        }
    }, [JSON.stringify(data), isLoading, loadData])

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
            {data.length > 0 ? (
                <InsightsResource.AudioFeatures
                    features={features}
                    tracks={tracks}
                    mean={mean}
                    normalized={meanNormalized}
                />
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
