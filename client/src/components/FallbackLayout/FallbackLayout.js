import React from 'react'
import PropTypes from 'prop-types'

/**
 * Component for fallback layout to serve certain non-essential contents
 */
const FallbackLayout = ({ children }) => (
    <div>
        <div>Header Banner</div>
        {children}
        <div>Footer Banner</div>
    </div>
)

FallbackLayout.propTypes = {
    /**
     * React children node
     */
    children: PropTypes.node.isRequired,
}

export default FallbackLayout
