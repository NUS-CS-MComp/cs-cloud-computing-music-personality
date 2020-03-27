import React from 'react'
import PropTypes from 'prop-types'

import useOAuthService from '@/hooks/use-oauth-service'

/**
 * Wrapper container for OAuth service component rendering
 */
const OAuthLogin = ({ provider, className, render }) => {
    const [, oauthServiceHandler] = useOAuthService(provider)
    return render({ className, provider, onClick: oauthServiceHandler })
}

OAuthLogin.propTypes = {
    /**
     * Class name for styling
     */
    className: PropTypes.string.isRequired,
    /**
     * OAuth provider name
     */
    provider: PropTypes.string.isRequired,
    /**
     * Render props
     */
    render: PropTypes.func,
}

OAuthLogin.defaultProps = {
    /**
     * @param {{ className: string, provider: string, onClick: function }} props Props to be passed to the rendered component
     */
    /* eslint-disable react/prop-types */
    render: ({ className, provider, onClick }) => {
        const name =
            provider.slice(0, 1).toUpperCase() + provider.slice(1).toLowerCase()
        return (
            <button type='button' className={className} onClick={onClick}>
                {name}
            </button>
        )
    },
    /* eslint-enable react/prop-types */
}

export default OAuthLogin
