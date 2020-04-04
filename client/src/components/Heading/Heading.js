import React from 'react'
import PropTypes from 'prop-types'

/**
 * Heading component
 */
const Heading = ({ text }) => (
    <h2 className='font-extrabold text-xl md:text-2xl mb-2 md:mb-4'>{text}</h2>
)

Heading.propTypes = {
    /**
     * Text string
     */
    text: PropTypes.string.isRequired,
}

export default Heading
