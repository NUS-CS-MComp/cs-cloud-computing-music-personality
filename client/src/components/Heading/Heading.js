import React from 'react'
import PropTypes from 'prop-types'

/**
 * Heading component
 */
const Heading = ({ text }) => (
    <h2 className='font-extrabold text-2xl my-2 md:text-2xl md:my-3'>{text}</h2>
)

Heading.propTypes = {
    /**
     * Text string
     */
    text: PropTypes.string.isRequired,
}

export default Heading
