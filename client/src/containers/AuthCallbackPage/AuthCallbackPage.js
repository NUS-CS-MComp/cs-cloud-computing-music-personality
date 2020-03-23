import React from 'react'
import { Redirect } from 'react-router-dom'

import OAuthServiceFactory from '@/utils/oauth-service/factory'

export default () => {
    const hashData = window.location.hash
    const urlParams = new URLSearchParams(hashData)

    let oauthState = urlParams.get('state')
    if (!hashData || !oauthState) return <Redirect exact to='/' />

    oauthState = JSON.parse(oauthState)

    const oauthService = OAuthServiceFactory.getOAuthServer(oauthState.provider)
    oauthService.parseToken(hashData)

    if (window.opener) return window.close()
    return <Redirect exact to={oauthState.redirected_from} />
}
