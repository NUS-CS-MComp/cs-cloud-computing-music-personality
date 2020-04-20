import lodash from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import EmptyData from '@components/EmptyData'
import Heading from '@components/Heading'
import Icon from '@components/Icon'
import InsightsResource from '@components/InsightsResource'
import useUserInfo from '@hooks/use-user-info'
import {
    requestPersonalityGroup,
    requestPersonalityInference,
} from '@redux/actions/insight'
import {
    inferenceInputSelector,
    userGroupSelector,
} from '@redux/selectors/insight'
import { userInsightsSelector } from '@redux/selectors/user'

/**
 * Container for inference based on user scores
 */
export default () => {
    const [renderingComponent, setRenderingComponent] = useState(null)
    const dispatch = useDispatch()
    const [, userInfo, loadUserInfo] = useUserInfo()

    const inputData = useSelector(inferenceInputSelector)
    const { cluster_assignment: clusterAssignment } = useSelector(
        userInsightsSelector
    )
    const groupData = useSelector(userGroupSelector)

    const isInputReady =
        !lodash.isEmpty(inputData.audio) &&
        !lodash.isEmpty(inputData.personality)
    const isAssignmentExisting = clusterAssignment != null

    const requestInference = useCallback(() => {
        if (isInputReady) {
            dispatch(
                requestPersonalityInference(
                    inputData.audio,
                    inputData.personality,
                    inputData.tracks
                )
            )
        }
    }, [JSON.stringify(inputData.audio), JSON.stringify(inputData.personality)])
    const requestUserGroup = useCallback(() => {
        if (isAssignmentExisting) {
            dispatch(requestPersonalityGroup())
        }
    }, [isAssignmentExisting])

    useEffect(() => {
        if (typeof userInfo === 'undefined') {
            loadUserInfo()
        }
    }, [userInfo, loadUserInfo])

    useEffect(() => {
        requestInference()
    }, [requestInference])

    useEffect(() => {
        requestUserGroup()
    }, [requestUserGroup, clusterAssignment])

    useEffect(() => {
        if (!isInputReady && !isAssignmentExisting) {
            setRenderingComponent(
                <EmptyData
                    message='No valid input found'
                    subtitle='Redirecting you to dashboard page in 5 seconds'
                    icon='error'
                    iconClassName='h-10'
                />
            )
            const timeout = setTimeout(() => {
                setRenderingComponent(<Redirect to='/insights' />)
            }, 5000)
            return () => clearTimeout(timeout)
        }
        if (typeof groupData !== 'undefined') {
            setRenderingComponent(
                <InsightsResource.SimilarGroup data={groupData} />
            )
        } else if (!isAssignmentExisting) {
            setRenderingComponent(
                <EmptyData
                    message='Learning you preference'
                    subtitle='Please wait for a few moments'
                    icon='ai'
                    iconClassName='h-10'
                />
            )
        }
        return () => {}
    }, [isInputReady, isAssignmentExisting, groupData])

    return (
        <div className='h-full flex flex-col'>
            <div className='flex items-center justify-between text-default-black'>
                <Heading
                    text='Similar to You'
                    subheading='Cluster based on your personality and music taste'
                />
                <button type='button' onClick={requestUserGroup}>
                    <Icon name='refresh' className='h-6 fill-current' />
                </button>
            </div>
            {renderingComponent}
        </div>
    )
}
