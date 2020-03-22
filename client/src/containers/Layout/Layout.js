import React from 'react'
import PropTypes from 'prop-types'

import Header from '@containers/Layout/Header'

const Layout = ({ children }) => (
    <div>
        <Header />
        {children}
    </div>
)

Layout.propTypes = {
    children: PropTypes.object.isRequired,
}

export default Layout
