import React from 'react'
import { useSelector } from 'react-redux'

import Heading from '@components/Heading'
import OAuthSection from '@containers/OAuthSection'
import useSpotifyResource from '@hooks/use-spotify-resource'
import {
    expiredProviderSelector,
    unavailableSocialProviderSelector,
} from '@redux/selectors/validate'

/**
 * Container to render provider connection
 */
export default () => {
    const socialProviders = useSelector(unavailableSocialProviderSelector)
    const expiredProviders = useSelector(expiredProviderSelector)
    const [, spotifyProviderName, isSpotifyAvailable] = useSpotifyResource('')
    return (
        <div className='block'>
            {expiredProviders.length > 0 && (
                <div className='block'>
                    <Heading
                        text='Reconnect to Service'
                        subheading='Your previous session has expired'
                    />
                    <div className='overflow-x-auto order-1 flex-1'>
                        <OAuthSection providers={expiredProviders} />
                    </div>
                </div>
            )}
            <div className='lg:grid lg:grid-cols-6'>
                <div
                    className={`${
                        socialProviders.length > 0 || !isSpotifyAvailable
                            ? 'block'
                            : 'hidden'
                    } lg:${
                        socialProviders.length > 0 ? 'block' : 'hidden'
                    } lg:${isSpotifyAvailable ? 'col-span-6' : 'col-span-4'}`}
                >
                    <Heading
                        text='Connect'
                        subheading='Sync with your social media'
                    />
                </div>
                {!isSpotifyAvailable && (
                    <div
                        className={`hidden lg:block lg:col-start-${
                            socialProviders.length > 0 ? '5' : '1'
                        } lg:${
                            socialProviders.length <= 0
                                ? 'col-span-6'
                                : 'col-span-2'
                        }`}
                    >
                        <Heading
                            text='Spotify'
                            subheading='Sync with your music history'
                        />
                    </div>
                )}
            </div>
            <div className='flex flex-row md:flex-col lg:flex-row lg:grid lg:grid-cols-6'>
                {!isSpotifyAvailable && (
                    <div className='mr-4 order-first flex-1 last:mr-0 md:mr-0 md:mb-4 lg:mb-0 lg:order-last lg:col-span-2'>
                        <OAuthSection
                            expandCard
                            providers={[spotifyProviderName]}
                        />
                    </div>
                )}
                {socialProviders.length > 0 && (
                    <div className='overflow-x-auto order-1 flex-1 lg:mr-8 lg:col-span-4'>
                        <OAuthSection providers={socialProviders} />
                    </div>
                )}
            </div>
        </div>
    )
}
