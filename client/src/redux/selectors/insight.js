import lodash from 'lodash'
import { createSelector } from 'reselect'

import { spotifyAudioFeaturesSelector } from '@redux/selectors/spotify'
import { userInsightsSelector } from '@redux/selectors/user'

/**
 * Selector for all insights resources
 * @param {Record<string, string>} state Store state
 */
export const userInsightSelector = (state) => state.insights

/**
 * Selector for aggregated input for inference
 */
export const inferenceInputSelector = createSelector(
    [spotifyAudioFeaturesSelector, userInsightsSelector],
    (audioFeatures, insights) => {
        const {
            mean: audioFeaturesAverage,
            tracks: audioTracks,
        } = audioFeatures
        const { personality_scores: personalityScores } = insights
        return {
            audio: audioFeaturesAverage || {},
            personality: personalityScores || {},
            tracks: audioTracks.map(({ id: trackID }) => trackID),
        }
    }
)

/**
 * Selector for user clustering group
 */
export const userGroupSelector = createSelector(
    userInsightSelector,
    (insights) => lodash.pick(insights.group, 'data').data
)
