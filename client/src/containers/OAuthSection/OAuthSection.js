import React from 'react'
import PropTypes from 'prop-types'

import OAuthLogin from '@containers/OAuthLogin'
import Heading from '@components/Heading'
import OAuthCard from '@components/OAuthCard'

/**
 * OAuth section container rendering card components
 */
const OAuthSection = ({ expandCard, heading, providers }) => (
    <div className='my-4'>
        {heading !== '' && <Heading text={heading} />}
        <div className='overflow-x-auto text-left flex flex-no-wrap'>
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
    </div>
)

OAuthSection.propTypes = {
    /**
     * Boolean flag to expand card component width
     */
    expandCard: PropTypes.bool,
    /**
     * Optional heading components
     */
    heading: PropTypes.string,
    /**
     * OAuth provider name list
     */
    providers: PropTypes.arrayOf(PropTypes.string).isRequired,
}

OAuthSection.defaultProps = {
    expandCard: false,
    heading: '',
}

export default OAuthSection
