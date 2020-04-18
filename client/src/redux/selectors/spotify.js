import lodash from 'lodash'
import { createSelector } from 'reselect'

/**
 * Selector for all Spotify resources
 * @param {Record<string, string>} state Store state
 */
export const spotifyResourceSelector = (state) => state.spotify

/**
 * Selector for specific Spotify resource
 * @param {string} resourceType Resource type string
 */
export const spotifyResourceDataSelector = (resourceType) =>
    createSelector(
        spotifyResourceSelector,
        (data) => lodash.pick(data[resourceType], 'data').data
    )

/**
 * Selector for Spotify resource fetch task loading status
 */
export const spotifyResourceLoadingSelector = createSelector(
    spotifyResourceSelector,
    (data) =>
        Object.keys(data).reduce((acc, resourceType) => {
            const resourceData = data[resourceType]
            if (
                typeof resourceData.data !== 'undefined' ||
                typeof resourceData.loading === 'undefined'
            ) {
                return Object.assign(acc, { [resourceType]: false })
            }
            return Object.assign(acc, { [resourceType]: true })
        }, {})
)

/**
 * Spotify audio feature keys
 */
export const AUDIO_FEATURE_KEYS = [
    { name: 'instrumentalness' },
    { name: 'liveness' },
    { name: 'speechiness' },
    { name: 'danceability' },
    { name: 'valence' },
    { name: 'loudness', min: -60, max: 0, unit: 'dB' },
    { name: 'tempo', min: 30, max: 280, unit: 'BPM' },
    { name: 'acousticness' },
    { name: 'energy' },
]

/**
 * Pick audio features from feature data
 * @param {Record<string, number>} features Feature map of a single track
 */
const pickAudioFeatures = (features) =>
    lodash.pick(
        features,
        AUDIO_FEATURE_KEYS.map((data) => data.name)
    )

/**
 * Calculate mean from audio feature data
 * @param {Record<string, number>[]} featureList List of feature maps from multiple tracks
 * @param {boolean} normalize Boolean flag to normalize the data
 */
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
 * Selector for average audio feature data
 */
export const spotifyAudioFeaturesSelector = createSelector(
    spotifyResourceDataSelector('recent-features'),
    (data) => {
        const features = data || []
        const pickedFeatures = features.map((trackWithFeature) =>
            pickAudioFeatures(trackWithFeature.feature)
        )
        return {
            tracks: features.map((trackWithFeature) => trackWithFeature.track),
            mean_normalized: lodash.isEmpty(pickedFeatures)
                ? {}
                : calculateAudioFeaturesMean(pickedFeatures),
            mean: lodash.isEmpty(pickedFeatures)
                ? {}
                : calculateAudioFeaturesMean(pickedFeatures, false),
        }
    }
)
