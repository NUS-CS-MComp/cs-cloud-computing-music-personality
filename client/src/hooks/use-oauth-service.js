import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { startOAuth } from '@redux/actions/oauth'
import OAuthServiceFactory from '@services/oauth/factory'

/**
 * Default callback for OAuth process
 * @param {function} dispatch Redux dispatch function from useDispatch hook
 */
const defaultOAuthCallback = (dispatch) => ({ status, data }) => {
    const dispatchData = { type: status, ...data }
    dispatch(dispatchData)
}

/**
 * Custom hook to handle OAuth incoming and outgoing request
 * @param {string} providerName OAuth provider name string
 * @returns {[import("@services/oauth").default, function, function]} OAuth service and callback handler to be passed to components
 */
const useOAuthService = (providerName) => {
    const dispatch = useDispatch()

    const oauthService = OAuthServiceFactory.getOAuthService(providerName)
    const oauthServiceCallback = defaultOAuthCallback(dispatch)
    const oauthServiceHandler = useCallback(() => {
        dispatch(startOAuth(providerName))
    }, [dispatch])

    return [oauthService, oauthServiceHandler, oauthServiceCallback]
}

export default useOAuthService
