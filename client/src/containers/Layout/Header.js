import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as Logo } from '@assets/spotlights.svg'
import useOAuthService from '@hooks/use-oauth-service'

/**
 * Header component as top visual bar for navigation purposes
 */
export default () => {
    const [collapsed, setCollapsed] = useState(false)
    const [, facebookOAuthHandler] = useOAuthService('facebook')
    const [, redditOAuthHandler] = useOAuthService('reddit')
    const [, spotifyOAuthHandler] = useOAuthService('spotify')
    return (
        <header className='flex items-center justify-between flex-wrap p-6'>
            <div className='flex flex-col items-center flex-shrink-0 mr-6'>
                <Link className='w-auto' exact='true' to='/'>
                    <Logo className='h-12 w-12' />
                </Link>
                <span>Spotlight</span>
            </div>
            <div className='block lg:hidden'>
                <button
                    type='button'
                    className='flex items-center px-3 py-2 text-black-200'
                    onClick={() => setCollapsed((prevBool) => !prevBool)}
                >
                    <svg
                        className='fill-current h-5 w-5'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <title>Menu</title>
                        <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
                    </svg>
                </button>
            </div>
            <div
                className={`w-full block flex-grow justify-end${
                    collapsed ? ' ' : ' hidden '
                }lg:flex lg:items-center lg:w-auto`}
            >
                <button
                    type='button'
                    className='block mt-4 lg:inline-block lg:mt-0 text-black-200 mr-4'
                    onClick={facebookOAuthHandler}
                >
                    Facebook
                </button>
                <button
                    type='button'
                    className='block mt-4 lg:inline-block lg:mt-0 text-black-200 mr-4'
                    onClick={redditOAuthHandler}
                >
                    Reddit
                </button>
                <button
                    type='button'
                    className='block mt-4 lg:inline-block lg:mt-0 text-black-200'
                    onClick={spotifyOAuthHandler}
                >
                    Spotify
                </button>
            </div>
        </header>
    )
}
