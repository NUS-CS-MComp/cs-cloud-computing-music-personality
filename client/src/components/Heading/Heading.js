import React from 'react'
import PropTypes from 'prop-types'

import toCamelCase from '@utils/camel-case'

/**
 * Heading component
 */
const Heading = ({ text, subheading }) => (
    <h2 className='font-extrabold text-default-black text-2xl mt-3 mb-2 md:text-2xxl md:mt-5 md:my-3'>
        <h2>{text}</h2>
        {subheading !== '' && (
            <div className='text-default-gray text-sm font-normal transform -translate-y-1 md:text-base'>
                {toCamelCase(subheading)}
            </div>
        )}
    </h2>
)

Heading.propTypes = {
    /**
     * Text string
     */
    text: PropTypes.string.isRequired,
    /**
     * Subheading text string
     */
    subheading: PropTypes.string,
}

Heading.defaultProps = {
    subheading: '',
}

export default Heading
