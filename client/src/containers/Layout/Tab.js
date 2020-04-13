import React from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'

import Icon from '@components/Icon'

/**
 * Navigation tab component
 */
const Tab = ({ icon, title, to }) => {
    const { pathname } = useLocation()
    const isFocusTab = pathname === to
    return (
        <div className='block w-full md:mb-4 md:last:mb-0'>
            <Link to={to}>
                <div
                    className={`duration-200 transform transition-colors text-center hover:text-spotify md:flex md:items-end md:rounded-full md:hover:bg-background-primary-light md:p-4 lg:rounded-lg ${
                        isFocusTab
                            ? 'text-spotify md:bg-background-primary-light md:text-header md:hover:text-header'
                            : 'text-default-black md:text-nav md:hover:text-nav'
                    }`}
                >
                    <Icon
                        name={icon}
                        className='h-6 sm:h-8 m-auto md:m-0 lg:mr-3'
                    />
                    <span className='hidden text-lg font-bold lg:inline-block'>
                        {title}
                    </span>
                </div>
            </Link>
        </div>
    )
}

Tab.propTypes = {
    /**
     * Icon name
     */
    icon: PropTypes.string.isRequired,
    /**
     * Title name
     */
    title: PropTypes.string.isRequired,
    /**
     * Route link
     */
    to: PropTypes.string.isRequired,
}

export default Tab
