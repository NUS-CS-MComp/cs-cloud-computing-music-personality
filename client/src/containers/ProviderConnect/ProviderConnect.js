import React from 'react'
import { useSelector } from 'react-redux'

import Heading from '@components/Heading'
import OAuthSection from '@containers/OAuthSection'
import useSpotifyResource from '@hooks/use-spotify-resource'
import { unavailableSocialProviderSelector } from '@redux/selectors/validate'

/**
 * Container to render provider connection
 */
export default () => {
    const socialProviders = useSelector(unavailableSocialProviderSelector)
    const [, spotifyProviderName, isSpotifyTokenValid] = useSpotifyResource('')
    return (
        <div className='block'>
            <div className='lg:grid lg:grid-cols-6'>
                <div
                    className={`${
                        socialProviders.length > 0 || !isSpotifyTokenValid
                            ? 'block'
                            : 'hidden'
                    } lg:${socialProviders.length > 0 ? 'block' : 'hidden'}`}
                >
                    <Heading text='Connect' />
                </div>
                {!isSpotifyTokenValid && (
                    <div
                        className={`hidden lg:block lg:col-start-${
                            socialProviders.length > 0 ? '5' : '1'
                        }`}
                    >
                        <Heading text='Spotify' />
                    </div>
                )}
            </div>
            <div className='flex flex-row md:flex-col lg:flex-row lg:grid lg:grid-cols-6'>
                {!isSpotifyTokenValid && (
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
