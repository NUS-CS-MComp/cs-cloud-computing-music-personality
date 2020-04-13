import React from 'react'

import Tab from '@containers/Layout/Tab'

/**
 * Navigation component appearing as bottom bar or part of header component
 */
export default () => (
    <nav className='flex flex-row items-start justify-around md:h-full md:block xl:min-w-full'>
        <Tab icon='home' title='Overview' to='/' />
        <Tab icon='music' title='Insights' to='/insights' />
        <Tab icon='user' title='Me' to='/me' />
    </nav>
)
