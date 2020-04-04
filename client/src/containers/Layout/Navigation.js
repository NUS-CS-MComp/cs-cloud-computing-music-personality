import React from 'react'

import OAuthLogin from '@containers/OAuthLogin'
import OAuthServiceFactory from '@services/oauth/factory'

/**
 * Navigation component appearing as bottom bar or part of header component
 */
export default () => {
    const services = OAuthServiceFactory.OAuthServices
    return (
        <nav className='w-full block flex flex-row items-center justify-around md:flex-col md:justify-center md:w-auto'>
            {services.map((provider) => (
                <OAuthLogin
                    key={provider}
                    className='inline-block md:block md:my-2'
                    provider={provider}
                />
            ))}
        </nav>
    )
}
