import lodash from 'lodash'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import FeatureMetrics from '@components/InsightsResource/FeatureMetrics'
import TopTracks from '@components/InsightsResource/TopTracks'
import RadarChart from '@components/RadarChart'
import useViewportSize from '@hooks/use-viewport-size'
import { AUDIO_FEATURE_KEYS } from '@redux/selectors/spotify'

export const VISUAL_AUDIO_FEATURE_KEYS = [
    'instrumentalness',
    'liveness',
    'danceability',
    'valence',
    'acousticness',
    'energy',
]

/**
 * Visual component for rendering audio features of Spotify tracks
 */
const AudioFeatures = ({ features, tracks, mean, normalized }) => {
    const { width } = useViewportSize()
    const [focusItem, setFocusItem] = useState(null)
    const visualizeFeatures = lodash.pick(normalized, VISUAL_AUDIO_FEATURE_KEYS)
    const focusItemFeatures = features[focusItem] || {}
    const focusItemVisualizeFeatures = lodash.pick(
        focusItemFeatures.normalized,
        VISUAL_AUDIO_FEATURE_KEYS
    )
    const [displayItem, rawItem] = lodash.isEmpty(focusItemFeatures)
        ? [visualizeFeatures, mean]
        : [focusItemVisualizeFeatures, focusItemFeatures.raw]
    const audioTracksCount = lodash.countBy(tracks, 'name')
    const audioTracksGroup = lodash.groupBy(tracks, 'name')
    const audioTrackReference = Object.keys(audioTracksGroup).reduce(
        (all, key) => Object.assign(all, { [key]: audioTracksGroup[key][0] }),
        {}
    )
    return (
        <div className='p-6 bg-default-white rounded-lg lg:grid lg:grid-cols-6 lg:items-center'>
            <div className='block text-center lg:col-span-3 xl:col-span-2 lg:order-1'>
                <RadarChart
                    round
                    data={[displayItem]}
                    margin={width >= 768 ? 100 : 80}
                    max={1}
                    level={3}
                    labelFactor={width >= 768 ? 1.2 : 1.1}
                    className='max-w-md inline-block'
                />
            </div>
            <div className='block lg:col-span-6 lg:order-3 lg:mt-4'>
                <FeatureMetrics
                    featureMetrics={focusItemFeatures.normalized || normalized}
                    rawMetrics={rawItem}
                    boundaryMap={lodash.keyBy(AUDIO_FEATURE_KEYS, 'name')}
                />
            </div>
            <div className='mt-6 md:mt-4 lg:mt-0 lg:col-span-3 lg:order-2 xl:col-span-4'>
                <TopTracks
                    trackCount={audioTracksCount}
                    trackReference={audioTrackReference}
                    topN={10}
                    focusHandler={setFocusItem}
                />
            </div>
        </div>
    )
}

AudioFeatures.propTypes = {
    /**
     * Feature information grouped by track ID
     */
    features: PropTypes.object.isRequired,
    /**
     * Track information in array form
     */
    tracks: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            artist: PropTypes.string,
            time: PropTypes.number,
            url: PropTypes.string,
            thumbnail: PropTypes.string,
        })
    ),
    /**
     * Mean value calculated from audio features
     */
    mean: PropTypes.shape({
        danceability: PropTypes.number,
        energy: PropTypes.number,
        key: PropTypes.number,
        loudness: PropTypes.number,
        speechiness: PropTypes.number,
        acousticness: PropTypes.number,
        instrumentalness: PropTypes.number,
        liveness: PropTypes.number,
        valence: PropTypes.number,
        tempo: PropTypes.number,
    }),
    /**
     * Normalized mean value calculated from audio features
     */
    normalized: PropTypes.shape({
        danceability: PropTypes.number,
        energy: PropTypes.number,
        key: PropTypes.number,
        loudness: PropTypes.number,
        speechiness: PropTypes.number,
        acousticness: PropTypes.number,
        instrumentalness: PropTypes.number,
        liveness: PropTypes.number,
        valence: PropTypes.number,
        tempo: PropTypes.number,
    }),
}

export default AudioFeatures
