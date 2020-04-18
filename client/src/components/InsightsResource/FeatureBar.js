import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

/**
 * Bar component rendering calculated feature values as percentage
 */
const FeatureBar = ({ value, raw, min, max, unit, color }) => {
    const hasCustomBoundary = min !== 0 && max !== 100
    const displayString = (hasCustomBoundary ? raw : raw * 100).toFixed(2)
    const [displayMin, displayMax] = [
        Math.min(Math.abs(min), Math.abs(max)) * (max < 0 ? -1 : 1),
        Math.max(Math.abs(min), Math.abs(max)) * (min < 0 ? -1 : 1),
    ]

    const [widthPercentage, setWidthPercentage] = useState(0)
    useEffect(() => {
        const timeout = setTimeout(() => setWidthPercentage(value * 100), 0)
        return () => {
            clearTimeout(timeout)
        }
    }, [])

    return (
        <div className='group'>
            <div className='relative w-full bg-background-secondary h-2 rounded-sm my-1'>
                <div
                    className={`h-full bg-${color} duration-700 transition-width text-xs leading-none py-1 text-center text-white rounded-l-sm`}
                    style={{
                        width: `${widthPercentage}%`,
                    }}
                ></div>
            </div>
            <div className='relative flex justify-between'>
                <span
                    className='font-semibold text-xs text-default-black absolute hidden z-10 group-hover:inline-block'
                    style={{
                        left: `calc(${widthPercentage}%)`,
                    }}
                >
                    {hasCustomBoundary ? displayString : `${displayString}%`}{' '}
                    {unit}
                </span>
                <span className='font-semibold text-xs text-default-black relative l-0 group-hover:text-default-white'>
                    {displayMin}
                </span>
                <span className='font-semibold text-xs text-default-black relative r-0 group-hover:text-default-white'>
                    {displayMax}
                </span>
            </div>
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
    min: PropTypes.number,
    /**
     * Optional maximum
     */
    max: PropTypes.number,
    /**
     * Optional unit
     */
    unit: PropTypes.string,
    /**
     * Color string
     */
    color: PropTypes.string,
}

FeatureBar.defaultProps = {
    min: 0,
    max: 100,
    unit: '',
    color: 'spotify',
}

export default FeatureBar
