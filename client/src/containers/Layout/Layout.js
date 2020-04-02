import React from 'react'
import PropTypes from 'prop-types'

import Header from '@containers/Layout/Header'
import Footer from '@containers/Layout/Footer'

/**
 * Default layout container for rendering of any children page component
 */
const Layout = ({ children }) => (
    <div className='h-full flex flex-col lg:grid lg:grid-flow-row lg:grid-cols-5 lg:grid-rows-1'>
        <div className='bg-spotify-green text-white lg:row-span-1'>
            <Header />
        </div>
        <div className='flex-auto lg:flex-none lg:col-span-4 lg:row-span-2'>
            {children}
        </div>
        <div className='bg-spotify-green text-white'>
            <Footer />
        </div>
    </div>
)

Layout.propTypes = {
    /**
     * React children node
     */
    children: PropTypes.node.isRequired,
}

export default Layout
