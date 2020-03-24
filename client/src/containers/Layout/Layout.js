import React from 'react'
import PropTypes from 'prop-types'

import Header from '@containers/Layout/Header'

/**
 * Default layout container for rendering of any children page component
 */
const Layout = ({ children }) => (
    <div>
        <Header />
        {children}
    </div>
)

Layout.propTypes = {
    /**
     * React children node
     */
    children: PropTypes.node.isRequired,
}

export default Layout
