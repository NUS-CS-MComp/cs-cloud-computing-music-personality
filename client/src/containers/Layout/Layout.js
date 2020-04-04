import React from 'react'
import PropTypes from 'prop-types'

import Header from '@containers/Layout/Header'
import Footer from '@containers/Layout/Footer'
import Navigation from '@containers/Layout/Navigation'

/**
 * Default layout container for rendering of any children page component
 */
const Layout = ({ children }) => (
    <div className='bg-secondary h-full text-center flex flex-col md:gap-0 md:grid md:grid-flow-row md:grid-cols-6 md:grid-rows-6'>
        <div className='p-6 bg-spotify text-white md:flex md:flex-col md:justify-center'>
            <Header />
        </div>
        <div className='overflow-y-scroll px-6 flex-auto md:p-6 md:flex-none md:col-span-5 md:row-span-6'>
            {children}
        </div>
        <div className='bg-white mt-4 p-4 md:mt-0 md:p-6 md:bg-spotify md:text-white md:row-span-4 md:flex md:flex-col md:justify-center'>
            <Navigation />
        </div>
        <div className='bg-spotify text-white hidden md:row-span-1 md:p-6 md:flex md:flex-col md:justify-center'>
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
