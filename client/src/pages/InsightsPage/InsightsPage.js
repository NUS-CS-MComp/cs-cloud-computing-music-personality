import React from 'react'

import InsightsResource from '@containers/InsightsResource'

/**
 * Insights visualization page container
 */
export default () => (
    <div className='h-full text-left flex flex-col'>
        <div className='my-2 md:my-0'>
            <InsightsResource.Inference />
        </div>
        <div className='my-2 md:my-0'>
            <InsightsResource.AudioFeatures />
        </div>
        <div className='my-2 md:my-0'>
            <InsightsResource.PersonalityInsights />
        </div>
    </div>
)
