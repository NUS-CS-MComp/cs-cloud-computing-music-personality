import React from 'react'

import OAuthServiceFactory from '@/utils/oauth-service/factory'

import { ReactComponent as Logo } from '@assets/spotlights.svg'

const Header = () => (
    <div>
        <div>
            <div>
                <div>
                    <div className='navbar-logo-parent'>
                        <Logo className='navbar-logo' />
                    </div>
                    <div>Spotlight</div>
                </div>
                <div>
                    <button
                        type='button'
                        onClick={() =>
                            OAuthServiceFactory.getOAuthServer(
                                'facebook'
                            ).handleOAuth()
                        }
                    >
                        Log-in to Facebook (New)
                    </button>
                    <button
                        type='button'
                        onClick={() => {
                            OAuthServiceFactory.getOAuthServer(
                                'spotify'
                            ).handleOAuth()
                        }}
                    >
                        Log-in to Spotify (New)
                    </button>
                </div>
            </div>
        </div>
    </div>
)

export default Header
