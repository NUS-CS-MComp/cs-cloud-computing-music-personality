import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Heading from '@components/Heading'
import InsightsResource from '@components/InsightsResource'
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
    const { personality_scores: personalityScores } = useSelector(
        userInsightsSelector
    )
    const generateScore = () => {
        if (aggregatedPost.length > 0) {
            dispatch(requestPersonalityScore(aggregatedPost))
        }
    }

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
        <div className='h-full'>
            <div className='flex items-center justify-between text-default-black'>
                <Heading
                    text='Personality Insights'
                    subheading='Personality scores from your social posts'
                />
                <button type='button' onClick={generateScore}>
                    Generate Score
                </button>
            </div>
            {personalityScores != null && (
                <InsightsResource.PersonalityScores
                    scores={personalityScores}
                />
            )}
        </div>
    )
}
