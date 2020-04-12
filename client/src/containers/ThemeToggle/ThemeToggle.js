import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { themeSelector } from '@redux/selectors/theme'

/**
 * Theme toggling container for switching among color themes
 */
const ThemeToggle = ({ children }) => {
    const currentTheme = useSelector(themeSelector)
    return (
        <div
            className={`theme-${currentTheme} bg-background-primary text-default-black h-full`}
        >
            {children}
        </div>
    )
}

ThemeToggle.propTypes = {
    /**
     * React children node
     */
    children: PropTypes.node.isRequired,
}

export default ThemeToggle
