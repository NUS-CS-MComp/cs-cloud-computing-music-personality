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
            className={`duration-200 transition-opacity bg-default-white bg-${provider} text-default-white h-auto ${
                expanded ? 'w-full' : 'w-32 sm:w-48'
            } mr-2 p-4 rounded-lg flex flex-grow-0 flex-shrink-0 items-center justify-center md:flex-1 xl:flex-initial hover:opacity-75 last:mr-0`}
            onClick={onClick}
            type='button'
        >
            <span>
                <Icon
                    name={provider}
                    color='default-white'
                    className='h-8 sm:mr-4'
                />
            </span>
            <h3 className='font-bold text-lg text-default-white hidden sm:block'>
                {expanded ? (
                    <span className='hidden sm:inline-block'>
                        Connect to {providerName}
                    </span>
                ) : (
                    <span>{providerName}</span>
                )}
            </h3>
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
