import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

/**
 * Bar component rendering calculated feature values as percentage
 */
const FeatureBar = ({
    value,
    raw,
    min,
    max,
    unit,
    color,
    useString,
    showScale,
}) => {
    const hasCustomBoundary = min !== 0 && max !== 100
    const displayString =
        typeof raw === 'number'
            ? (hasCustomBoundary ? raw : raw * 100).toFixed(2)
            : raw
    const [displayMin, displayMax] = [
        useString
            ? min
            : Math.min(Math.abs(min), Math.abs(max)) * (max < 0 ? -1 : 1),
        useString
            ? max
            : Math.max(Math.abs(min), Math.abs(max)) * (min < 0 ? -1 : 1),
    ]

    const [widthPercentage, setWidthPercentage] = useState(0)
    useEffect(() => {
        const timeout = setTimeout(() => setWidthPercentage(value * 100), 0)
        return () => {
            clearTimeout(timeout)
        }
    }, [value])

    return (
        <div className='group w-full'>
            <div className='relative bg-background-inner-dark h-2 rounded-sm my-1'>
                <div
                    className={`h-full bg-${color} duration-700 transition-width text-xs leading-none py-1 text-center text-white rounded-sm`}
                    style={{
                        width: `${widthPercentage}%`,
                    }}
                ></div>
            </div>
            {showScale && (
                <div className='relative flex justify-between'>
                    <span
                        className='font-semibold text-xs text-default-gray absolute hidden z-10 group-hover:inline-block'
                        style={{
                            left: `calc(${widthPercentage}%)`,
                        }}
                    >
                        {hasCustomBoundary
                            ? displayString
                            : `${displayString}%`}{' '}
                        {unit}
                    </span>
                    <span className='font-semibold text-xs text-default-gray relative l-0 group-hover:opacity-0'>
                        {displayMin}
                    </span>
                    <span className='font-semibold text-xs text-default-gray relative r-0 group-hover:opacity-0'>
                        {displayMax}
                    </span>
                </div>
            )}
        </div>
    )
}

FeatureBar.propTypes = {
    /**
     * Percentage value
     */
    value: PropTypes.number.isRequired,
    /**
     * Raw value
     */
    raw: PropTypes.number.isRequired,
    /**
     * Optional minimum
     */
    min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Optional maximum
     */
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Optional unit
     */
    unit: PropTypes.string,
    /**
     * Color string
     */
    color: PropTypes.string,
    /**
     * Boolean flag to deal with string value
     */
    useString: PropTypes.bool,
    /**
     * Boolean flag to show scale
     */
    showScale: PropTypes.bool,
}

FeatureBar.defaultProps = {
    min: 0,
    max: 100,
    unit: '',
    color: 'spotify',
    useString: false,
    showScale: true,
}

export default FeatureBar
