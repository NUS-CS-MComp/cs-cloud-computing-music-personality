import React from 'react'
import { Redirect } from 'react-router-dom'

import useOAuthService from '@hooks/use-oauth-service'
import URLParamParser from '@utils/param-parser'

/**
 * Page container to handler OAuth callback
 * Redirect to homepage if no related parameters are found
 */
export default () => {
    const urlParamEntries = URLParamParser.parse()
    const oauthState = urlParamEntries.state || ''
    const [oauthService, , oauthServiceCallback] = useOAuthService(
        urlParamEntries.provider
    )

    if (oauthService === undefined || !oauthService.verifyState(oauthState)) {
        return <div>OAuth Error</div>
    }

    const oauthResult = oauthService.parseToken(urlParamEntries)
    if (oauthService.cleanupFromPopup()) return undefined

    const lastLocation = localStorage.getItem(
        oauthService.processor.lastLocationKey
    )
    oauthServiceCallback(oauthResult.output)
    oauthService.cleanupFromRedirect()

    return <Redirect exact to={lastLocation || '/'} />
}
