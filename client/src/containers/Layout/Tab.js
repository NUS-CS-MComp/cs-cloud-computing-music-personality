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
        <span className='w-full'>
            <Link to={to}>
                <div
                    className={`duration-200 transform transition-color text-center md:flex md:items-end hover:text-spotify ${
                        isFocusTab
                            ? 'text-spotify md:text-header'
                            : 'text-default-black md:text-nav'
                    } md:transition-move md:hover:text-header md:hover:opacity-75 lg:hover:translate-x-1`}
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
        </span>
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
