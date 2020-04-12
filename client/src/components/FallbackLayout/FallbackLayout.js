import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { ReactComponent as Logo } from '@assets/spotlights.svg'

/**
 * Component for fallback layout to serve certain non-essential contents
 */
const FallbackLayout = ({ children }) => (
    <div className='h-full flex flex-col items-center'>
        <header className='p-6 bg-background-primary flex-initial w-full text-nav'>
            <Link className='w-auto' exact='true' to='/'>
                <Logo className='fill-current h-8 sm:h-8 md:h-10 lg:h-12' />
            </Link>
        </header>
        <div className='bg-background-secondary flex-1 flex items-center justify-center w-full'>
            {children}
        </div>
        <footer className='p-6 bg-background-primary text-footer flex-initial w-full text-sm'>
            &copy; 2020 SpotLight Team for CS5224
        </footer>
    </div>
)

FallbackLayout.propTypes = {
    /**
     * React children node
     */
    children: PropTypes.node.isRequired,
}

export default FallbackLayout
