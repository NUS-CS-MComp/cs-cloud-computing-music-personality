import React from 'react'

import SocialConnect from '@containers/SocialConnect'
import SocialPostList from '@containers/SocialPostList'
import SpotifyConnect from '@containers/SpotifyConnect'

/**
 * OVerview page container
 */
export default () => (
    <div className='h-full text-left flex flex-col'>
        <div className='flex flex-row whitespace-no-wrap md:flex-col xl:flex-row'>
            <div className='mr-4 order-first flex-1 md:mr-0 xl:order-last'>
                <SpotifyConnect />
            </div>
            <div className='overflow-x-auto order-1 flex-1 xl:mr-4'>
                <SocialConnect />
            </div>
        </div>
        <SocialPostList />
    </div>
)
