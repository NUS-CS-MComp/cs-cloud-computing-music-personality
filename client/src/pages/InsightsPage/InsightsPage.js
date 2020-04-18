import React from 'react'

import AudioFeatures from '@containers/InsightsResource/AudioFeatures'

/**
 * Insights visualization page container
 */
export default () => (
    <div className='h-full text-left flex flex-col'>
        <div className='my-2 md:my-0'>
            <AudioFeatures />
        </div>
    </div>
)
