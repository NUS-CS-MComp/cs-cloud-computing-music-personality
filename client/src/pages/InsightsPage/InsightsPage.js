import React from 'react'
import {
    Link,
    Route,
    Switch,
    useLocation,
    useRouteMatch,
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import InsightsResource from '@containers/InsightsResource'
import ProviderConnect from '@containers/ProviderConnect'
import { unconnectedProviderSelector } from '@redux/selectors/validate'

/**
 * Insights visualization page container
 */
export default () => {
    const { path, url } = useRouteMatch()
    const { pathname } = useLocation()
    const unconnectedProviders = useSelector(unconnectedProviderSelector)
    return (
        <div className='h-full text-left flex flex-col'>
            <div className='flex justify-start mt-6 mb-2 justify-start whitespace-no-wrap overflow-x-auto flex-initial flex-shrink-0'>
                <div
                    className={`duration-200 transition-colors uppercase font-bold mr-4 p-3 bg-default-white rounded-md hover:text-spotify ${
                        pathname === url ? 'text-spotify' : 'text-default-black'
                    }`}
                >
                    <Link to={`${url}`}>Dashboard</Link>
                </div>
                <div
                    className={`duration-200 transition-colors uppercase font-bold mr-0 p-3 bg-default-white rounded-md hover:text-spotify hover:opacity-100 ${
                        pathname === `${url}/similar`
                            ? 'text-spotify'
                            : 'text-default-black'
                    }`}
                >
                    <Link to={`${url}/similar`}>Interest Group</Link>
                </div>
            </div>
            <Switch>
                <Route exact path={path}>
                    {unconnectedProviders.length > 0 && (
                        <div className='my-2 md:my-0 md:flex-auto md:flex-grow-0'>
                            <ProviderConnect />
                        </div>
                    )}
                    <div className='flex flex-col'>
                        <div className='my-2 md:my-0'>
                            <InsightsResource.AudioFeatures />
                        </div>
                        <div className='my-2 mb-4 md:mb-0 md:my-0'>
                            <InsightsResource.PersonalityInsights />
                        </div>
                    </div>
                </Route>
                <Route path={`${path}/similar`}>
                    <div className='my-2 md:my-0 mb-4 md:mb-0 lg:max-h-full lg:min-h-0'>
                        <InsightsResource.Inference />
                    </div>
                </Route>
            </Switch>
        </div>
    )
}
