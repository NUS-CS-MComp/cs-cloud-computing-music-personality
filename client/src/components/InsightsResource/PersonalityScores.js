import lodash from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import FeatureBar from '@components/InsightsResource/FeatureBar'

/**
 * Constants for personality scores
 */

const PERSONALITY_DIMENSION_KEYS = lodash.keyBy(
    [
        { name: 'big5_openness', label: 'openness' },
        { name: 'big5_conscientiousness', label: 'conscientiousness' },
        { name: 'big5_extraversion', label: 'extraversion' },
        { name: 'big5_agreeableness', label: 'agreeableness' },
        { name: 'big5_neuroticism', label: 'neuroticism' },
    ],
    'name'
)

const CONSUMPTION_PREF_KEY_PATTERN = /consumption_preferences_\w+/i

/**
 * Helper functions
 */

const formatConsumptionPattern = (pattern) => {
    const chunks = pattern.split('_').slice(2)
    return chunks.join(' ')
}

/**
 * Component for personality scores
 */
const PersonalityScores = ({ scores }) => {
    const personalityScores = lodash.pick(
        scores,
        Object.keys(PERSONALITY_DIMENSION_KEYS)
    )
    const consumptionScores = lodash.pick(
        scores,
        Object.keys(scores).filter((key) =>
            CONSUMPTION_PREF_KEY_PATTERN.test(key)
        )
    )
    return (
        <div className='bg-default-white rounded-lg md:grid md:grid-rows-1-min-content md:grid-cols-7 md:items-center'>
            <div className='px-6 pt-6 md:pb-6 md:row-span-1 md:row-span-1 md:col-span-3'>
                {Object.keys(personalityScores).map((metricName) => (
                    <div key={metricName}>
                        <span className='capitalize font-bold text-sm text-default-black'>
                            {PERSONALITY_DIMENSION_KEYS[metricName].label}
                        </span>
                        <FeatureBar
                            value={scores[metricName]}
                            raw={scores[metricName]}
                            color='bar-yellow'
                        />
                    </div>
                ))}
            </div>
            <div className='p-3 md:row-span-1 md:col-span-4'>
                <div className='p-3 bg-background-inner h-48 overflow-y-auto rounded-md md:h-64 lg:flex lg:justify-between lg:flex-wrap'>
                    {Object.keys(consumptionScores).map((metricName) => (
                        <div key={metricName} className='lg:w-1/2-m-2'>
                            <span className='capitalize font-bold text-sm text-default-black break-words'>
                                {formatConsumptionPattern(metricName)}
                            </span>
                            <FeatureBar
                                useString
                                value={scores[metricName]}
                                raw={scores[metricName]}
                                color='bar-blue'
                                min='NO'
                                max='YES'
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

PersonalityScores.propTypes = {
    /**
     * Personality scores
     */
    scores: PropTypes.oneOfType([
        PropTypes.shape({
            big5_openness: PropTypes.number,
            big5_conscientiousness: PropTypes.number,
            big5_extraversion: PropTypes.number,
            big5_agreeableness: PropTypes.number,
            big5_neuroticism: PropTypes.number,
        }),
        PropTypes.objectOf(PropTypes.number),
    ]).isRequired,
}

export default PersonalityScores
