import React from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as Logo } from '@assets/spotlights.svg'

/**
 * Header component as top visual bar for navigation purposes
 */
export default () => (
    <header className='flex items-center justify-between flex-wrap md:flex-col md:h-80% md:justify-evenly md:pb-0'>
        <div className='flex flex-col items-center flex-shrink-0 mr-6 md:mr-0 md:my-6'>
            <Link className='w-auto' exact='true' to='/'>
                <Logo className='fill-current h-8 sm:h-8 md:h-10 lg:h-12' />
            </Link>
        </div>
    </header>
)
