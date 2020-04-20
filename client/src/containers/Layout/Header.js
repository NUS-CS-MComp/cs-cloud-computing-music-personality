import React from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as Logo } from '@assets/icons/spotlights.svg'

/**
 * Header component as top visual bar for navigation purposes
 */
export default () => (
    <header className='header w-full md:flex md:flex-col md:items-center md:p-1'>
        <Link
            className='flex flex-row items-end flex-shrink-0 mr-6 md:mr-0'
            exact='true'
            to='/'
        >
            <Logo className='fill-current h-6 sm:h-8' />
        </Link>
    </header>
)
