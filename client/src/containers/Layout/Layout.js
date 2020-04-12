import React from 'react'
import PropTypes from 'prop-types'

import Header from '@containers/Layout/Header'
import Footer from '@containers/Layout/Footer'
import Navigation from '@containers/Layout/Navigation'
import ThemeToggler from '@containers/Layout/Theme'

/**
 * Default layout container for rendering of any children page component
 */
const Layout = ({ children }) => (
    <div className='duration-200 transition-color m-auto bg-background-secondary h-full text-center flex flex-col md:gap-0 md:grid md:grid-flow-row md:grid-cols-6 md:grid-rows-6 xl:grid-cols-8 fhd:grid-cols-12 fhd:max-w-fhd'>
        <div className='p-6 bg-background-primary text-header flex flex-row justify-between items-center md:flex-col md:justify-around md:col-span-1 md:row-span-2'>
            <Header />
            <ThemeToggler />
        </div>
        <div className='overflow-y-auto max-h-screen px-6 flex-auto md:p-6 md:flex-none md:col-span-5 md:row-span-6 xl:col-span-7 fhd:col-span-11'>
            {children}
        </div>
        <div className='bg-default-white p-4 shadow-nav z-10 md:p-0 md:bg-background-primary md:text-header md:row-span-2 md:flex md:flex-col md:justify-center md:items-center md:shadow-none'>
            <Navigation />
        </div>
        <div className='bg-background-primary text-footer hidden md:row-span-2 md:row-start-5 md:p-6 md:flex md:flex-col md:justify-center'>
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
