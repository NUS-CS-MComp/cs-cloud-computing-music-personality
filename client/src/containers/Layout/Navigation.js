import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Navigation component appearing as bottom bar or part of header component
 */
export default () => (
    <nav className='w-full block flex flex-row items-center justify-around md:flex-col md:justify-center md:w-auto'>
        <Link to='/'>Overview</Link>
        <Link to='/not-found'>Not Found</Link>
    </nav>
)
