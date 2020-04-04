import React from 'react'
import PropTypes from 'prop-types'

import Icon from '@components/Icon'
import toCamelCase from '@utils/camel-case'

/**
 * Card component for social media SSO
 */
const OAuthCard = ({ expanded, provider, onClick }) => {
    const providerName = toCamelCase(provider)
    return (
        <button
            className={`inline-block bg-white bg-${provider} text-white h-auto ${
                expanded ? 'w-full' : 'w-40 sm:w-48'
            } mr-2 p-4 rounded-lg flex flex-grow-0 flex-shrink-0 items-center justify-center md:flex-1`}
            onClick={onClick}
            type='button'
        >
            <span>
                <Icon name={provider} color='white' className='h-8 mr-4' />
            </span>
            <h3 className='font-bold text-lg'>{providerName}</h3>
        </button>
    )
}

OAuthCard.propTypes = {
    /**
     * Boolean flag to expand card width
     */
    expanded: PropTypes.bool,
    /**
     * Click event handler
     */
    onClick: PropTypes.func,
    /**
     * Provider name
     */
    provider: PropTypes.string,
}

OAuthCard.defaultProps = {
    expanded: false,
    onClick: () => {},
}

export default OAuthCard
