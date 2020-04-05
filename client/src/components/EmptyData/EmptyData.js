import React from 'react'
import PropTypes from 'prop-types'

import Icon from '@components/Icon'

/**
 * Empty card component indicating no data
 */
const EmptyData = ({ message, icon, iconClassName, iconColor }) => (
    <div className='bg-white p-4 rounded-lg uppercase font-bold min-h-64 text-center flex flex-1 flex-col items-center justify-center'>
        <span className='my-2'>
            <Icon name={icon} className={iconClassName} color={iconColor} />
        </span>
        <span>{message}</span>
    </div>
)

EmptyData.propTypes = {
    /**
     * Optional icon string
     */
    icon: PropTypes.string,
    /**
     * Optional icon class name string
     */
    iconClassName: PropTypes.string,
    /**
     * Optional icon color string
     */
    iconColor: PropTypes.string,
    /**
     * Optional message string
     */
    message: PropTypes.string,
}

EmptyData.defaultProps = {
    message: 'No Data',
    icon: '',
    iconClassName: '',
    iconColor: 'spotify',
}

export default EmptyData
