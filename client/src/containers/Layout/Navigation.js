import React from 'react'
import { Link } from 'react-router-dom'

import Icon from '@components/Icon'

/**
 * Navigation component appearing as bottom bar or part of header component
 */
export default () => (
    <nav className='w-auto flex flex-row items-start justify-around md:h-full md:flex-col md:justify-around md:items-center lg:items-start'>
        <Link to='/'>
            <div className='md:flex md:items-end'>
                <Icon
                    name='home'
                    className='h-6 sm:h-8 m-auto md:m-0 lg:mr-3'
                />
                <span className='hidden text-lg font-bold lg:inline-block'>
                    Overview
                </span>
            </div>
        </Link>
        <Link to='/not-found'>
            <div className='md:flex md:items-end'>
                <Icon
                    name='music'
                    className='h-6 sm:h-8 m-auto md:m-0 lg:mr-3'
                />
                <span className='hidden text-lg font-bold lg:inline-block'>
                    Insights
                </span>
            </div>
        </Link>
        <Link to='/not-found'>
            <div className='md:flex md:items-end'>
                <Icon
                    name='user'
                    className='h-6 sm:h-8 m-auto md:m-0 lg:mr-3'
                />
                <span className='hidden text-lg font-bold lg:inline-block'>
                    Me
                </span>
            </div>
        </Link>
    </nav>
)
