import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as Logo } from '@assets/spotlights.svg'
import OAuthLogin from '@containers/OAuthLogin'
import OAuthServiceFactory from '@services/oauth/factory'

/**
 * Header component as top visual bar for navigation purposes
 */
export default () => {
    const [collapsed, setCollapsed] = useState(false)
    const services = OAuthServiceFactory.OAuthServices
    return (
        <header className='flex items-center justify-between flex-wrap p-6 lg:flex-col lg:h-full lg:justify-evenly'>
            <div className='flex flex-col items-center flex-shrink-0 mr-6 lg:mr-0'>
                <Link className='w-auto' exact='true' to='/'>
                    <Logo className='fill-current h-8 sm:h-10 lg:h-12' />
                </Link>
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
            <nav
                className={`w-full block flex-grow justify-end${
                    collapsed ? ' ' : ' hidden '
                }lg:flex lg:flex-col lg:items-center lg:w-auto lg:justify-center`}
            >
                {services.map((provider, index) => (
                    <OAuthLogin
                        key={provider}
                        className={`block mt-4 lg:inline-block lg:mt-0 lg:mr-0 lg:mb-4 text-black-200 ${
                            index === services.length - 1 ? '' : 'mr-4'
                        }`}
                        provider={provider}
                    />
                ))}
            </nav>
        </header>
    )
}
