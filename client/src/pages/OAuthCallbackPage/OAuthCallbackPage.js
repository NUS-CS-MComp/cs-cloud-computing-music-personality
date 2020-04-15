import lodash from 'lodash'
import React from 'react'
import { useHistory } from 'react-router-dom'

import useOAuthService from '@hooks/use-oauth-service'
import URLParamParser from '@utils/param-parser'

/**
 * Page container to handler OAuth callback
 * Redirect to homepage if no related parameters are found
 */
export default () => {
    const locationHistory = useHistory()

    const urlParamEntries = URLParamParser.parse()
    const [service, status, , postResult] = useOAuthService(
        urlParamEntries.provider
    )

    if (lodash.isEmpty(status.exchange)) {
        if (!service || !service.verifyState(urlParamEntries.state)) {
            return (
                <div className='uppercase font-bold'>
                    You are at the wrong page.
                </div>
            )
        }
        const parseResult = service.parseToken(urlParamEntries).output
        if (!service.cleanupFromPopup()) postResult(parseResult)
    } else if (
        status.exchange.failed ||
        (status.verify && !status.verify.loading)
    ) {
        const timeoutTask = setTimeout(() => {
            clearTimeout(timeoutTask)
            if (service.cleanupFromRedirect() && service.shouldRedirect) {
                locationHistory.push(service.lastLocation)
            }
        }, 0)
    }

    return <div className='uppercase font-bold'>Redirecting You</div>
}
