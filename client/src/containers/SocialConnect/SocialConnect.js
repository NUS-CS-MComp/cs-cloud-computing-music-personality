import React from 'react'
import { useSelector } from 'react-redux'

import OAuthSection from '@containers/OAuthSection'
import { unavailableSocialProviderSelector } from '@redux/selectors/validate'

/**
 * Social media account connection container
 */
export default () => {
    const providers = useSelector(unavailableSocialProviderSelector)
    if (providers.length > 0) {
        return <OAuthSection providers={providers} heading='Social Media' />
    }
    return null
}
