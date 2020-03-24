import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { oauthStart } from '@redux/actions/oauth'
import logger from '@utils/logger'
import OAuthServiceFactory from '@utils/oauth-service/factory'

/**
 * Default callback for OAuth process
 * @param {function} dispatch Redux dispatch function from useDispatch hook
 */
const defaultOAuthCallback = (dispatch) => ({ status, data }) => {
    dispatch({ type: status, ...data })
}

/**
 * Custom hook to handle OAuth incoming and outgoing request
 * @param {string} providerName OAuth provider name string
 * @param {function} handlerCallback Callback function to replace the default callback function
 * @returns {[import('../utils/oauth-service').OAuthService, function, function]} OAuth service and callback handler to be passed to components
 */
const useOAuthService = (providerName, callback) => {
    const dispatch = useDispatch()

    const oauthService = OAuthServiceFactory.getOAuthServer(providerName)
    if (oauthService === undefined) {
        logger.warn(
            `No OAuth service provider found for name ${providerName}. This might be caused by incorrect set-up in @utils/oauth-service/config.js file.`
        )
    }

    const oauthCallback = callback || defaultOAuthCallback(dispatch)
    const oauthHandler = useCallback(() => {
        dispatch(oauthStart(providerName))
        oauthService.handleOAuth(oauthCallback)
    }, [dispatch])

    return [oauthService, oauthHandler, oauthCallback]
}

export default useOAuthService
