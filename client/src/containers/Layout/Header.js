import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import FacebookLogin from 'react-facebook-login'

import {
    Alignment,
    Navbar,
    NavbarGroup,
    NavbarHeading,
    NavbarDivider,
    Button,
    Classes,
} from '@blueprintjs/core'
import { Example } from '@blueprintjs/docs-theme'

import { connect } from 'react-redux'
import {
    addSpotifyAccessToken,
    addFBAccessToken,
    addFBUserId,
} from '../../redux/actions/actions'

import { ReactComponent as Logo } from '../../assets/spotlights.svg'

// For Spotify Login
const spotifyClientId = 'ff7fe21803c54a3e8bac44b4add23e3b'
const spotifyRedirectUri = 'http://localhost:3000'
const spotifyResponseType = 'token'
const spotifyScopes = 'user-read-recently-played'

// For Facebook Login
const facebookAppId = '1041946872841143'
const facebookFields = 'name,email,picture'
const facebookScopes = 'user_posts'

const parseForSpotifyToken = window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
        if (item) {
            const parts = item.split('=')
            const temp = { ...initial }
            temp[parts[0]] = decodeURIComponent(parts[1])
            return temp
        }
        return initial
    }, {})

const Header = (props) => {
    useEffect(() => {
        const token = parseForSpotifyToken.access_token
        if (token) {
            props.addSpotifyAccessToken(token)
        }
    })
    const { fbAccessToken, spotifyAccessToken } = props
    return (
        <div>
            <Example>
                <Navbar>
                    <NavbarGroup>
                        <NavbarHeading className='navbar-logo-parent'>
                            <Logo className='navbar-logo' />
                        </NavbarHeading>
                        <NavbarHeading>Spotlight</NavbarHeading>
                    </NavbarGroup>
                    <NavbarGroup align={Alignment.RIGHT}>
                        <NavbarDivider />
                        {!fbAccessToken ? (
                            <FacebookLogin
                                appId={facebookAppId}
                                fields={facebookFields}
                                scope={facebookScopes}
                                callback={(response) => {
                                    props.addFBAccessToken(response.accessToken)
                                    props.addFBUserId(response.userID)
                                }}
                                cssClass='navbar-fb-login'
                            />
                        ) : (
                            'Logged In FB'
                        )}
                        <NavbarDivider />
                        {!spotifyAccessToken ? (
                            <a
                                // eslint-disable-next-line max-len
                                href={`https://accounts.spotify.com/authorize?client_id=${spotifyClientId}&redirect_uri=${spotifyRedirectUri}&response_type=${spotifyResponseType}&scope=${spotifyScopes}`}
                            >
                                <Button
                                    className={Classes.MINIMAL}
                                    icon='log-in'
                                    text='Login'
                                />
                            </a>
                        ) : (
                            'Logged In SP'
                        )}
                    </NavbarGroup>
                </Navbar>
            </Example>
        </div>
    )
}

const mapDispatchToProps = {
    addSpotifyAccessToken,
    addFBAccessToken,
    addFBUserId,
}

const mapStateToProps = (state) => ({
    spotifyAccessToken: state.spotifyAccessToken,
    fbAccessToken: state.fbAccessToken,
    fbUserId: state.fbUserId,
})

Header.propTypes = {
    addSpotifyAccessToken: PropTypes.func.isRequired,
    addFBAccessToken: PropTypes.func.isRequired,
    addFBUserId: PropTypes.func.isRequired,
    fbAccessToken: PropTypes.string,
    spotifyAccessToken: PropTypes.string,
}

Header.defaultProps = {
    fbAccessToken: null,
    spotifyAccessToken: null,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
