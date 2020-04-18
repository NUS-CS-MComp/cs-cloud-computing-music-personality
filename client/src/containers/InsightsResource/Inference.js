import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Heading from '@components/Heading'
import { requestPersonalityInference } from '@redux/actions/insight'
import { inferenceInputSelector } from '@redux/selectors/insight'
import { userInsightsSelector } from '@redux/selectors/user'

/**
 * Container for inference based on user scores
 */
export default () => {
    const dispatch = useDispatch()
    const inputData = useSelector(inferenceInputSelector)
    const { cluster_assignment: clusterAssignment } = useSelector(
        userInsightsSelector
    )

    const requestInference = useCallback(() => {
        if (inputData.audio.length > 0 && inputData.personality.length > 0) {
            dispatch(
                requestPersonalityInference(
                    inputData.audio,
                    inputData.personality,
                    inputData.tracks
                )
            )
        }
    }, [JSON.stringify(inputData.audio), JSON.stringify(inputData.personality)])

    return (
        <div className='h-full'>
            <div className='flex items-center justify-between text-default-black'>
                <Heading
                    text='Similar to You'
                    subheading='Cluster based on your personality and music taste'
                />
                <button type='button' onClick={requestInference}>
                    Infer
                </button>
            </div>
            {JSON.stringify(clusterAssignment)}
        </div>
    )
}
