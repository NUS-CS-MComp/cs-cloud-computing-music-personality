import React from 'react'
import PropTypes from 'prop-types'

import Icon from '@components/Icon'

/**
 * Empty card component indicating no data
 */
const EmptyData = ({
    message,
    subtitle,
    render,
    icon,
    iconClassName,
    iconColor,
}) => (
    <div className='bg-default-white p-4 rounded-lg uppercase font-bold min-h-64 text-center flex flex-1 flex-col items-center justify-center md:h-full'>
        <span className='my-2'>
            <Icon name={icon} className={iconClassName} color={iconColor} />
        </span>
        {render({ message, subtitle })}
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
    /**
     * Optional subtitle string
     */
    subtitle: PropTypes.string,
    /**
     * Component rendering function
     */
    render: PropTypes.func,
}

EmptyData.defaultProps = {
    message: 'No Data',
    subtitle: '',
    // eslint-disable-next-line react/prop-types
    render: ({ message, subtitle }) => (
        <>
            <span className='text-default-black text-heading'>{message}</span>
            {subtitle !== '' && (
                <span className='text-default-gray text-sm normal-case'>
                    {subtitle}
                </span>
            )}
        </>
    ),
    icon: '',
    iconClassName: '',
    iconColor: 'spotify',
}

export default EmptyData
