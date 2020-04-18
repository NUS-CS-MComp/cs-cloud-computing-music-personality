import React from 'react'
import PropTypes from 'prop-types'

import FeatureBar from '@components/InsightsResource/FeatureBar'

/**
 * Component for summarizing audio features
 */
const FeatureMetrics = ({ featureMetrics, rawMetrics, boundaryMap }) => (
    <div className='flex flex-row flex-wrap justify-between'>
        {Object.keys(featureMetrics).map((featureName) => (
            <div className='w-1/2-m-2 lg:w-1/3-m-3'>
                <div className='capitalize font-bold text-sm text-spotify'>
                    {featureName}
                </div>
                <FeatureBar
                    value={featureMetrics[featureName]}
                    raw={rawMetrics[featureName]}
                    min={boundaryMap[featureName].min}
                    max={boundaryMap[featureName].max}
                    unit={boundaryMap[featureName].unit}
                />
            </div>
        ))}
    </div>
)

FeatureMetrics.propTypes = {
    /**
     * Normalized feature metrics
     */
    featureMetrics: PropTypes.object.isRequired,
    /**
     * Raw feature metric
     */
    rawMetrics: PropTypes.object.isRequired,
    /**
     * Reference for minimum and maximum boundary
     */
    boundaryMap: PropTypes.object.isRequired,
}

export default FeatureMetrics
