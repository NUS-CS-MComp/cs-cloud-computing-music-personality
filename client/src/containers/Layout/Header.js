import React from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as Logo } from '@assets/spotlights.svg'
import useOAuthService from '@hooks/use-oauth-service'

/**
 * Header component as top visual bar for navigation purposes
 */
export default () => {
    const [, facebookOAuthHandler] = useOAuthService('facebook')
    const [, spotifyOAuthHandler] = useOAuthService('spotify')
    return (
        <header className='flex items-center justify-between flex-wrap p-6'>
            <div className='flex flex-col items-center flex-shrink-0 mr-6'>
                <Link className='w-auto' exact='true' to='/'>
                    <Logo className='h-12 w-12' />
                </Link>
                <span>Spotlight</span>
            </div>
            <div>
                <button
                    className='mr-4'
                    type='button'
                    onClick={facebookOAuthHandler}
                >
                    Log-in to Facebook (New)
                </button>
                <button type='button' onClick={spotifyOAuthHandler}>
                    Log-in to Spotify (New)
                </button>
            </div>
        </header>
    )
}
