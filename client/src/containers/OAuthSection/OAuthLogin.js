import React from 'react'
import PropTypes from 'prop-types'

import useOAuthService from '@hooks/use-oauth-service'
import toCamelCase from '@utils/camel-case'

/**
 * Wrapper container for OAuth service component rendering
 */
const OAuthLogin = ({ provider, className, render }) => {
    const [, oauthServiceHandler] = useOAuthService(provider)
    return render({ className, provider, onClick: oauthServiceHandler })
}

OAuthLogin.propTypes = {
    /**
     * OAuth provider name
     */
    provider: PropTypes.string.isRequired,
    /**
     * Class name for styling
     */
    className: PropTypes.string,
    /**
     * Render props
     */
    render: PropTypes.func,
}

OAuthLogin.defaultProps = {
    className: '',
    /**
     * @param {{ className: string, provider: string, onClick: function }} props Props to be passed to the rendered component
     */
    /* eslint-disable react/prop-types */
    render: ({ className, provider, onClick }) => {
        const name = toCamelCase(provider)
        return (
            <button type='button' className={className} onClick={onClick}>
                {name}
            </button>
        )
    },
    /* eslint-enable react/prop-types */
}

export default OAuthLogin
