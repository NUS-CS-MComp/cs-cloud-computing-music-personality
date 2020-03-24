import React from 'react'
import { Redirect } from 'react-router-dom'

import useOAuthService from '@hooks/use-oauth-service'
import OAuthService from '@utils/oauth-service'

/**
 * Page container to handler OAuth callback
 * Redirect to homepage if no related parameters are found
 */
export default () => {
    const urlParams = OAuthService.parseOAuthParams()
    const oauthState = JSON.parse(urlParams.get('state') || '{}')
    const [oauthService, , oauthCallback] = useOAuthService(oauthState.provider)

    if (oauthService === undefined || !oauthService.verifyState(oauthState)) {
        return <div>OAuth Error</div>
    }

    const oauthResult = oauthService.parseToken(urlParams)
    if (oauthService.cleanup()) return undefined

    oauthCallback(oauthResult.output)
    return <Redirect exact to={oauthState.redirected_from} />
}
