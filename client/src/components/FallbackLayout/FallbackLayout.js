import React from 'react'
import PropTypes from 'prop-types'

const FallbackLayout = ({ children }) => (
    <div>
        <div>Header Banner</div>
        {children}
        <div>Footer Banner</div>
    </div>
)

FallbackLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default FallbackLayout
