import lodash from 'lodash'
import React from 'react'
import { useHistory } from 'react-router-dom'

import Icon from '@components/Icon'
import Spinner from '@components/Spinner'
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
                <div className='my-auto'>
                    <Icon
                        name='error'
                        className='h-10 my-auto inline-block'
                    ></Icon>
                    <div className='my-2 uppercase font-bold text-lg'>
                        You are at the wrong page.
                    </div>
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

    return (
        <div className='flex-1 flex justify-center items-center'>
            <div className='uppercase font-bold text-lg text-spotify'>
                <Spinner />
                Redirecting You
            </div>
        </div>
    )
}
