import React from 'react'
import { useSelector } from 'react-redux'

import ProviderConnect from '@containers/ProviderConnect'
import SocialPostList from '@containers/SocialPostList'
import SpotifyResource from '@containers/SpotifyResource'
import { unconnectedProviderSelector } from '@redux/selectors/validate'

/**
 * OVerview page container
 */
export default () => {
    const unconnectedProviders = useSelector(unconnectedProviderSelector)
    return (
        <div className='h-full text-left flex flex-col'>
            {unconnectedProviders.length > 0 && (
                <div className='my-2 md:my-0 md:flex-auto md:flex-grow-0'>
                    <ProviderConnect />
                </div>
            )}
            <div className='flex flex-col flex-1 last:mb-4 md:grid md:grid-cols-6 md:max-h-full md:grid-rows-1-auto md:min-h-0 md:last:mb-0'>
                <div className='my-2 md:col-span-4 md:mr-8 md:grid-rows-1 md:my-0'>
                    <SocialPostList />
                </div>
                <div className='my-2 md:col-span-2 md:grid-rows-1 md:my-0'>
                    <SpotifyResource.RecentHistory />
                </div>
            </div>
        </div>
    )
}
