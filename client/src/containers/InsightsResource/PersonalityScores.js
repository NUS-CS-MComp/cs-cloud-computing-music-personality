import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useSocialPosts from '@hooks/use-social-posts'
import useUserInfo from '@hooks/use-user-info'
import { requestPersonalityScore } from '@redux/actions/insight'
import { userInsightsSelector } from '@redux/selectors/user'

/**
 * Personality insights score container
 */
export default () => {
    const dispatch = useDispatch()

    const [, userInfo, loadUserInfo] = useUserInfo()
    const [, aggregatedPost, loadPostData] = useSocialPosts()
    const userInsights = useSelector(userInsightsSelector)

    useEffect(() => {
        if (typeof userInfo === 'undefined') {
            loadUserInfo()
        }
    }, [userInfo, loadUserInfo])

    useEffect(() => {
        if (aggregatedPost.length <= 0) {
            loadPostData()
        }
    }, [loadPostData])

    return (
        <div>
            <div>{JSON.stringify(userInsights)}</div>
            <div>{JSON.stringify(aggregatedPost)}</div>
            <button
                type='button'
                onClick={() =>
                    dispatch(requestPersonalityScore(aggregatedPost))
                }
            >
                Get score
            </button>
            <div>{JSON.stringify(STUB)}</div>
        </div>
    )
}

// eslint-disable-next-line
var STUB = {
    big5_openness: 0.7382310696110134,
    big5_conscientiousness: 0.6340184461388745,
    big5_extraversion: 0.5500401358190203,
    big5_agreeableness: 0.6913175627784136,
    big5_neuroticism: 0.3808611931051521,
    consumption_preferences_automobile_ownership_cost: 0.0,
    consumption_preferences_automobile_safety: 0.0,
    consumption_preferences_clothes_quality: 1.0,
    consumption_preferences_clothes_style: 1.0,
    consumption_preferences_clothes_comfort: 0.0,
    consumption_preferences_influence_brand_name: 1.0,
    consumption_preferences_influence_utility: 0.5,
    consumption_preferences_influence_online_ads: 1.0,
    consumption_preferences_influence_social_media: 0.0,
    consumption_preferences_influence_family_members: 0.0,
    consumption_preferences_spur_of_moment: 0.5,
    consumption_preferences_credit_card_payment: 1.0,
    consumption_preferences_eat_out: 1.0,
    consumption_preferences_gym_membership: 1.0,
    consumption_preferences_outdoor: 0.5,
    consumption_preferences_concerned_environment: 0.5,
    consumption_preferences_start_business: 0.0,
    consumption_preferences_movie_romance: 0.0,
    consumption_preferences_movie_adventure: 1.0,
    consumption_preferences_movie_horror: 0.0,
    consumption_preferences_movie_musical: 0.0,
    consumption_preferences_movie_historical: 0.0,
    consumption_preferences_movie_science_fiction: 0.0,
    consumption_preferences_movie_war: 1.0,
    consumption_preferences_movie_drama: 0.0,
    consumption_preferences_movie_action: 1.0,
    consumption_preferences_movie_documentary: 1.0,
    consumption_preferences_music_rap: 1.0,
    consumption_preferences_music_country: 0.5,
    consumption_preferences_music_r_b: 0.5,
    consumption_preferences_music_hip_hop: 1.0,
    consumption_preferences_music_live_event: 1.0,
    consumption_preferences_music_playing: 0.0,
    consumption_preferences_music_latin: 1.0,
    consumption_preferences_music_rock: 0.5,
    consumption_preferences_music_classical: 0.5,
    consumption_preferences_read_frequency: 0.0,
    consumption_preferences_books_entertainment_magazines: 0.0,
    consumption_preferences_books_non_fiction: 1.0,
    consumption_preferences_books_financial_investing: 1.0,
    consumption_preferences_books_autobiographies: 0.0,
    consumption_preferences_volunteer: 0.0,
}
