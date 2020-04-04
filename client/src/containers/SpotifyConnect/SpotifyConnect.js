import React from 'react'

import OAuthSection from '@containers/OAuthSection'

import OAUTH_CONFIG from '@services/oauth/config'

/**
 * Spotify connection container
 */
export default () => (
    <OAuthSection
        expandCard
        heading='Connect to Spotify'
        providers={[OAUTH_CONFIG.SPOTIFY_OAUTH_CONFIG.providerName]}
    />
)
