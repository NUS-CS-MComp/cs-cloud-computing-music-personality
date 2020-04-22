import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import EmptyData from '@components/EmptyData'
import Heading from '@components/Heading'
import Icon from '@components/Icon'
import InsightsResource from '@components/InsightsResource'
import useSocialPosts from '@hooks/use-social-posts'
import useUserInfo from '@hooks/use-user-info'
import { requestPersonalityScore } from '@redux/actions/insight'
import { userInsightsSelector } from '@redux/selectors/user'

/**
 * Helper function to determine returned component by phase
 * @param {Record<string, string>[]} aggregatedPost List of aggregated social posts
 * @param {Record<string, string>} userPersonalityScores User personality scores
 * @param {function} actionHandler Action handler for fallback phase
 */
const getComponentByPhase = (
    aggregatedPost,
    userPersonalityScores,
    actionHandler
) => {
    if (userPersonalityScores != null) {
        return (
            <InsightsResource.PersonalityScores
                scores={userPersonalityScores}
            />
        )
    }
    if (aggregatedPost.length <= 0) {
        return (
            <EmptyData
                message='Connect to Social Media to view'
                icon='social'
                iconClassName='h-10'
            />
        )
    }
    if (
        aggregatedPost
            .map((post) => post.message)
            .join(' ')
            .split(' ').length < 100
    ) {
        return (
            <EmptyData
                message='Unable to generate score'
                subtitle='Total word count should be more than 100'
                icon='error'
                iconClassName='h-10'
            />
        )
    }
    return (
        <EmptyData
            icon='score'
            iconClassName='h-10'
            render={() => (
                <button
                    onClick={actionHandler}
                    type='button'
                    className='mt-2 duration-200 transition-colors uppercase font-bold p-3 bg-background-inner rounded-md hover:text-spotify'
                >
                    Generate score
                </button>
            )}
        />
    )
}

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
        loadPostData()
    }, [loadPostData])

    return (
        <div className='h-full'>
            <div className='flex items-center justify-between text-default-black'>
                <Heading
                    text='Personality Insights'
                    subheading='Personality scores from your social posts'
                />
                <button type='button' onClick={generateScore}>
                    <Icon name='refresh' className='h-6 fill-current' />
                </button>
            </div>
            {getComponentByPhase(
                aggregatedPost,
                personalityScores,
                generateScore
            )}
        </div>
    )
}
