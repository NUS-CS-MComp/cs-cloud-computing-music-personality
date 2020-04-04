import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { startFetchSocialPosts } from '@redux/actions/social'
import { availableSocialProviderSelector } from '@redux/selectors/validate'
import { socialPostAggregatedSelector } from '@redux/selectors/social'

/**
 * Custom hook to fetch social posts from social media
 * @returns {[string[], Record<string, string>[], function]} Available social service providers,  social media post data and callback handler
 */
const useSocialPosts = () => {
    const dispatch = useDispatch()
    const availableSocialProviders = useSelector(
        availableSocialProviderSelector
    )
    const aggregatedPosts = useSelector(socialPostAggregatedSelector)
    const dispatchCallback = useCallback(() => {
        availableSocialProviders.forEach((provider) => {
            dispatch(startFetchSocialPosts(provider))
        })
    }, [dispatch, JSON.stringify(availableSocialProviders)])
    return [availableSocialProviders, aggregatedPosts, dispatchCallback]
}

export default useSocialPosts
