import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { startOAuth, clearOAuth } from '@redux/actions/oauth'
import { initValidation } from '@redux/actions/validate'
import { providerTokenSelector } from '@redux/selectors/oauth'
import { providerValiditySelector } from '@redux/selectors/validate'
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
 * @returns {[import("@services/oauth").default, Record<string, Record<string, string>>, function, function]} OAuth service and callback handler to be passed to components
 */
const useOAuthService = (providerName) => {
    const dispatch = useDispatch()

    const oauthStatus = useSelector(providerTokenSelector(providerName))
    const oauthVerifyStatus = useSelector(
        providerValiditySelector(providerName)
    )

    const oauthService = OAuthServiceFactory.getOAuthService(providerName)
    const oauthServiceCallback = defaultOAuthCallback(dispatch)
    const oauthServiceHandler = useCallback(() => {
        dispatch(startOAuth(providerName))
    }, [dispatch])

    useEffect(() => {
        if (typeof oauthStatus !== 'undefined' && oauthStatus.completed) {
            dispatch(clearOAuth(providerName))
            dispatch(initValidation(providerName))
        }
    }, [JSON.stringify(oauthStatus)])

    return [
        oauthService,
        { exchange: oauthStatus, verify: oauthVerifyStatus },
        oauthServiceHandler,
        oauthServiceCallback,
    ]
}

export default useOAuthService
