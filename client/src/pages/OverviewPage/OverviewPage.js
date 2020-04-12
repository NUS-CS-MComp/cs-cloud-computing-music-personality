import React from 'react'

import ProviderConnect from '@containers/ProviderConnect'
import SocialPostList from '@containers/SocialPostList'
import SpotifyResource from '@containers/SpotifyResource'

/**
 * OVerview page container
 */
export default () => (
    <div className='h-full text-left flex flex-col'>
        <div className='my-2 md:my-0 md:flex-auto md:flex-grow-0'>
            <ProviderConnect />
        </div>
        <div className='flex flex-col flex-1 md:grid md:grid-cols-6 md:max-h-full md:grid-rows-1-auto md:min-h-0'>
            <div className='my-2 md:col-span-4 md:mr-8 md:grid-rows-1 md:my-0'>
                <SocialPostList />
            </div>
            <div className='my-2 md:col-span-2 md:grid-rows-1 md:my-0'>
                <SpotifyResource.RecentHistory />
            </div>
        </div>
    </div>
)
