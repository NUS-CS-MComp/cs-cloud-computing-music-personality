import React from 'react'
import PropTypes from 'prop-types'

import OAuthCard from '@components/OAuthCard'
import OAuthLogin from '@containers/OAuthSection/OAuthLogin'

/**
 * OAuth section container rendering card components
 */
const OAuthSection = ({ expandCard, providers }) => (
    <div className='text-left flex flex-no-wrap'>
        {providers.map((provider) => (
            <OAuthLogin
                key={provider}
                provider={provider}
                render={({ onClick }) => (
                    <OAuthCard
                        expanded={expandCard}
                        onClick={onClick}
                        provider={provider}
                    />
                )}
            />
        ))}
    </div>
)

OAuthSection.propTypes = {
    /**
     * Boolean flag to expand card component width
     */
    expandCard: PropTypes.bool,
    /**
     * OAuth provider name list
     */
    providers: PropTypes.arrayOf(PropTypes.string).isRequired,
}

OAuthSection.defaultProps = {
    expandCard: false,
}

export default OAuthSection
