import { createSelector } from 'reselect'

import { spotifyAudioFeaturesSelector } from '@redux/selectors/spotify'
import { userInsightsSelector } from '@redux/selectors/user'

/**
 * Constants
 */

const AUDIO_FEATURES_KEY_ORDER = [
    'instrumentalness',
    'liveness',
    'speechiness',
    'danceability',
    'valence',
    'loudness',
    'tempo',
    'acousticness',
    'energy',
]

const PERSONALITY_SCORE_KEY_ORDER = [
    'big5_agreeableness',
    'big5_conscientiousness',
    'big5_extraversion',
    'big5_neuroticism',
    'big5_openness',
    'consumption_preferences_spur_of_moment',
    'consumption_preferences_credit_card_payment',
    'consumption_preferences_influence_brand_name',
    'consumption_preferences_influence_utility',
    'consumption_preferences_influence_online_ads',
    'consumption_preferences_influence_social_media',
    'consumption_preferences_influence_family_members',
    'consumption_preferences_clothes_quality',
    'consumption_preferences_clothes_style',
    'consumption_preferences_clothes_comfort',
    'consumption_preferences_automobile_ownership_cost',
    'consumption_preferences_automobile_safety',
    'consumption_preferences_music_rap',
    'consumption_preferences_music_country',
    'consumption_preferences_music_r_b',
    'consumption_preferences_music_hip_hop',
    'consumption_preferences_music_live_event',
    'consumption_preferences_music_playing',
    'consumption_preferences_music_latin',
    'consumption_preferences_music_rock',
    'consumption_preferences_music_classical',
    'consumption_preferences_gym_membership',
    'consumption_preferences_outdoor',
    'consumption_preferences_eat_out',
    'consumption_preferences_movie_romance',
    'consumption_preferences_movie_adventure',
    'consumption_preferences_movie_horror',
    'consumption_preferences_movie_musical',
    'consumption_preferences_movie_historical',
    'consumption_preferences_movie_science_fiction',
    'consumption_preferences_movie_war',
    'consumption_preferences_movie_drama',
    'consumption_preferences_movie_action',
    'consumption_preferences_movie_documentary',
    'consumption_preferences_read_frequency',
    'consumption_preferences_books_entertainment_magazines',
    'consumption_preferences_books_non_fiction',
    'consumption_preferences_books_financial_investing',
    'consumption_preferences_books_autobiographies',
    'consumption_preferences_volunteer',
    'consumption_preferences_concerned_environment',
    'consumption_preferences_start_business',
]

/**
 * Select for aggregated input for inference
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
            audio:
                (audioFeaturesAverage &&
                    AUDIO_FEATURES_KEY_ORDER.map(
                        (key) => audioFeaturesAverage[key]
                    )) ||
                [],
            personality:
                (personalityScores &&
                    PERSONALITY_SCORE_KEY_ORDER.map(
                        (key) => personalityScores[key]
                    )) ||
                [],
            tracks: audioTracks.map(({ id: trackID }) => trackID),
        }
    }
)
