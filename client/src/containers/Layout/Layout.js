import React from 'react'
import PropTypes from 'prop-types'

import Footer from '@containers/Layout/Footer'
import Header from '@containers/Layout/Header'
import Navigation from '@containers/Layout/Navigation'
import TopBar from '@containers/Layout/TopBar'

/**
 * Default layout container for rendering of any children page component
 */
const Layout = ({ children }) => (
    <div className='relative duration-200 transition-color m-auto bg-background-secondary h-full text-center flex flex-col md:gap-0 md:grid md:grid-flow-row md:grid-cols-6 md:grid-rows-6 fhd:grid-cols-8 fhd:max-w-fhd'>
        <div className='p-6 bg-background-primary text-header md:col-span-1 md:row-span-1'>
            <Header />
        </div>
        <div className='overflow-y-auto max-h-screen px-6 flex flex-col flex-auto md:py-6 md:overflow-y-hidden md:flex-none md:col-span-5 md:row-span-6 fhd:col-span-7'>
            <div className='absolute m-4 sm:m-5 right-0 top-0 text-nav md:text-default-gray md:m-0 md:flex md:flex-row-reverse md:relative md:mb-2'>
                <TopBar />
            </div>
            <div className='block min-h-0 flex-1 md:overflow-y-auto'>
                {children}
            </div>
        </div>
        <div className='nav bg-default-white p-4 shadow-nav z-10 md:px-6 md:py-0 md:bg-background-primary md:text-header md:row-span-2 md:flex md:flex-col md:justify-center md:items-center md:shadow-none'>
            <Navigation />
        </div>
        <div className='footer bg-background-primary text-footer hidden md:row-span-3 md:p-6 md:flex md:flex-col md:justify-center'>
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
