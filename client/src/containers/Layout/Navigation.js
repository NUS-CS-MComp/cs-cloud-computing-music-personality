import React from 'react'

import Tab from '@containers/Layout/Tab'

/**
 * Navigation component appearing as bottom bar or part of header component
 */
export default () => (
    <nav className='w-auto flex flex-row items-start justify-around md:h-full md:flex-col md:justify-around md:items-center md:items-start'>
        <Tab icon='home' title='Overview' to='/' />
        <Tab icon='music' title='Insights' to='/insights' />
        <Tab icon='user' title='Me' to='/me' />
    </nav>
)
