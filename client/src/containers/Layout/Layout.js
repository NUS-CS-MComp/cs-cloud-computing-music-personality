import React from 'react'
import PropTypes from 'prop-types'

import Header from '@containers/Layout/Header'
import Footer from '@containers/Layout/Footer'
import Navigation from '@containers/Layout/Navigation'

/**
 * Default layout container for rendering of any children page component
 */
const Layout = ({ children }) => (
    <div className='bg-light-grey h-full text-center flex flex-col md:gap-0 md:grid md:grid-flow-row md:grid-cols-6 md:grid-rows-6'>
        <div className='p-6 text-spotify-green md:bg-spotify-green md:text-white md:flex md:flex-col md:justify-center'>
            <Header />
        </div>
        <div className='overflow-y-scroll p-6 flex-auto md:flex-none md:col-span-5 md:row-span-6'>
            {children}
        </div>
        <div className='p-6 md:bg-spotify-green md:text-white md:row-span-4 md:flex md:flex-col md:justify-center'>
            <Navigation />
        </div>
        <div className='bg-spotify-green text-white hidden md:row-span-1 md:p-6 md:flex md:flex-col md:justify-center'>
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
