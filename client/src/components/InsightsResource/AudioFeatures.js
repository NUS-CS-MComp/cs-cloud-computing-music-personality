import lodash from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import FeatureMetrics from '@components/InsightsResource/FeatureMetrics'
import RadarChart from '@components/RadarChart'
import TopTracks from '@components/InsightsResource/TopTracks'
import useViewportSize from '@hooks/use-viewport-size'

/**
 * Constants for Spotify audio features
 */

const AUDIO_FEATURE_KEYS = [
    { name: 'instrumentalness' },
    { name: 'liveness' },
    { name: 'danceability' },
    { name: 'valence' },
    { name: 'acousticness' },
    { name: 'energy' },
    { name: 'speechiness' },
    { name: 'loudness', min: -60, max: 0, unit: 'dB' },
    { name: 'tempo', min: 30, max: 280, unit: 'BPM' },
]

const VISUAL_AUDIO_FEATURE_KEYS = [
    'instrumentalness',
    'liveness',
    'danceability',
    'valence',
    'acousticness',
    'energy',
]

/**
 * Helper functions
 */

// Pick all audio features from data
const pickAudioFeatures = (features) =>
    lodash.pick(
        features,
        AUDIO_FEATURE_KEYS.map((data) => data.name)
    )

// Calculate mean from audio feature data
const calculateAudioFeaturesMean = (featureList, normalize = true) =>
    AUDIO_FEATURE_KEYS.reduce((result, audioFeature) => {
        let mean = lodash.meanBy(featureList, audioFeature.name)
        if (normalize) {
            if (
                typeof audioFeature.min !== 'undefined' &&
                typeof audioFeature.max !== 'undefined'
            ) {
                if (audioFeature.max === 0) {
                    mean /= audioFeature.min
                } else mean = (mean - audioFeature.min) / audioFeature.max
            }
        }
        return Object.assign(result, {
            [audioFeature.name]: mean,
        })
    }, {})

/**
 * Visual component for rendering audio features of Spotify tracks
 */
const AudioFeatures = ({ features }) => {
    const { width } = useViewportSize()

    const averageFeatures = calculateAudioFeaturesMean(
        features.map((trackWithFeature) =>
            pickAudioFeatures(trackWithFeature.feature)
        )
    )
    const averageFeaturesRaw = calculateAudioFeaturesMean(
        features.map((trackWithFeature) =>
            pickAudioFeatures(trackWithFeature.feature)
        ),
        false
    )
    const visualizeFeatures = lodash.pick(
        averageFeatures,
        VISUAL_AUDIO_FEATURE_KEYS
    )

    const audioTracks = features.map(
        (trackWithFeature) => trackWithFeature.track
    )
    const audioTracksCount = lodash.countBy(audioTracks, 'name')
    const audioTracksGroup = lodash.groupBy(audioTracks, 'name')
    const audioTrackReference = Object.keys(audioTracksGroup).reduce(
        (all, key) => Object.assign(all, { [key]: audioTracksGroup[key][0] }),
        {}
    )
    return (
        <div className='p-4 bg-default-white rounded-lg lg:grid lg:grid-cols-6 lg:items-center'>
            <div className='block text-center lg:col-span-3 xl:col-span-2 lg:order-1'>
                <RadarChart
                    round
                    data={[visualizeFeatures]}
                    margin={width >= 768 ? 100 : 80}
                    level={3}
                    labelFactor={width >= 768 ? 1.2 : 1.1}
                    className='max-w-md inline-block'
                />
            </div>
            <div className='block lg:col-span-6 lg:order-3 lg:my-4'>
                <FeatureMetrics
                    featureMetrics={averageFeatures}
                    rawMetrics={averageFeaturesRaw}
                    boundaryMap={lodash.keyBy(AUDIO_FEATURE_KEYS, 'name')}
                />
            </div>
            <div className='mt-6 lg:mt-4 lg:col-span-3 lg:order-2 lg:px-4 xl:col-span-4'>
                <TopTracks
                    trackCount={audioTracksCount}
                    trackReference={audioTrackReference}
                    topN={10}
                />
            </div>
        </div>
    )
}

AudioFeatures.propTypes = {
    /**
     * Audio feature data
     */
    features: PropTypes.arrayOf(
        PropTypes.shape({
            track: PropTypes.shape({
                name: PropTypes.string,
                artist: PropTypes.string,
                time: PropTypes.number,
                url: PropTypes.string,
                thumbnail: PropTypes.string,
            }),
            feature: PropTypes.shape({
                danceability: PropTypes.number,
                energy: PropTypes.number,
                key: PropTypes.number,
                loudness: PropTypes.number,
                mode: PropTypes.number,
                speechiness: PropTypes.number,
                acousticness: PropTypes.number,
                instrumentalness: PropTypes.number,
                liveness: PropTypes.number,
                valence: PropTypes.number,
                tempo: PropTypes.number,
                type: PropTypes.string,
                id: PropTypes.string,
                uri: PropTypes.string,
                track_href: PropTypes.string,
                analysis_url: PropTypes.string,
                duration_ms: PropTypes.number,
                time_signature: PropTypes.number,
            }),
        })
    ),
}

export default AudioFeatures
