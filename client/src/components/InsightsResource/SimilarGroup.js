import lodash from 'lodash'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Icon from '@components/Icon'
import { VISUAL_AUDIO_FEATURE_KEYS } from '@components/InsightsResource/AudioFeatures'
import PersonalityScores from '@components/InsightsResource/PersonalityScores'
import RadarChart from '@components/RadarChart'
import { calculateAudioFeaturesMean } from '@redux/selectors/spotify'
import formatTimeStamp from '@utils/format-unix-time'

/**
 * Component rendering similar user group
 */
const SimilarGroup = ({ data }) => {
    const [focusUser, setFocusUser] = useState(0)
    const focusUserData = data[focusUser]
    const displayAudioFeatures = lodash.pick(
        calculateAudioFeaturesMean([
            focusUserData.insights.average_audio_features,
        ]),
        VISUAL_AUDIO_FEATURE_KEYS
    )
    return (
        <div className='p-6 bg-default-white rounded-lg flex min-h-0 flex-col lg:flex-row'>
            <div className='flex overflow-x-auto lg:flex-auto lg:flex-grow-0 lg:flex-shrink-0 lg:overflow-y-auto lg:flex-col lg:mr-4'>
                {data.map((userInsight, index) => (
                    <div
                        className={`group p-3 rounded cursor-default flex-shrink-0 flex flex-col lg:max-w-xs mr-2 last:mr-0 lg:mr-0 lg:mb-2 lg:last:mb-0 lg:transition-content-height ${
                            index === focusUser
                                ? 'border-t-8 border-spotify bg-background-inner text-spotify opacity-100 justify-start w-full-m max-h-sm lg:w-auto lg:h-auto lg:max-h-md xl:max-w-lg'
                                : 'bg-background-inner opacity-75 justify-start w-64 lg:h-auto lg:w-auto xl:max-w-lg'
                        }`}
                        key={userInsight.user_id}
                        onClick={() => setFocusUser(index)}
                        onKeyPress={() => setFocusUser(index)}
                        role='button'
                        tabIndex={0}
                    >
                        <div className='block'>
                            <div className='font-bold text-lg uppercase my-1'>
                                {userInsight.profile.user_name}
                            </div>
                            <div className='text-sm text-default-black my-1'>
                                {userInsight.profile.short_bio}
                            </div>
                            <div className='text-xs text-default-gray'>
                                Joined {formatTimeStamp(userInsight.created_at)}
                            </div>
                        </div>
                        {index !== focusUser && (
                            <div className='w-full mt-auto'>
                                <PersonalityScores
                                    compact
                                    scores={
                                        userInsight.insights.personality_scores
                                    }
                                    showConsumption={false}
                                    withBackground={false}
                                />
                            </div>
                        )}
                        {index === focusUser && (
                            <div className='min-h-0 my-2 flex'>
                                {userInsight.insights.inferred_from_post
                                    .slice(0, 1)
                                    .map((post) => (
                                        <div className='w-full text-default-black max-h-full flex flex-col'>
                                            <div className='flex justify-between items-center mb-2'>
                                                <span className='flex items-center'>
                                                    Latest post on
                                                    <Icon
                                                        name={post.provider}
                                                        className='h-5 block ml-2'
                                                    />
                                                </span>
                                                <span className='text-sm ml-auto text-default-gray'>
                                                    {formatTimeStamp(post.time)}
                                                </span>
                                            </div>
                                            <div className='min-h-0 overflow-y-auto text-base break-all'>
                                                {post.message}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className='flex-auto relative md:flex md:flex-col md:justify-between lg:px-4'>
                <div className='text-lg font-bold capitalize mt-6 my-4 md:text-xl'>{`${focusUserData.profile.user_name}'s Music Taste & Personality`}</div>
                <RadarChart
                    round
                    data={[displayAudioFeatures]}
                    margin={80}
                    max={1}
                    level={3}
                    labelFactor={1.1}
                    className='flex-1 block max-w-lg mx-auto'
                />
                <PersonalityScores
                    scores={focusUserData.insights.personality_scores}
                    showConsumption={false}
                    withBackground={false}
                />
            </div>
        </div>
    )
}

SimilarGroup.propTypes = {
    /**
     * Group insights data
     */
    data: PropTypes.arrayOf(
        PropTypes.shape({
            created_at: PropTypes.number,
            insights: PropTypes.object,
            provider: PropTypes.object,
            profile: PropTypes.object,
        })
    ),
}

export default SimilarGroup
