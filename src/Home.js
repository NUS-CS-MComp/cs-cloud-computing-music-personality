import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import {
    Alignment,
    Navbar,
    NavbarGroup,
    NavbarHeading,
    NavbarDivider,
    Button,
    Classes,
} from '@blueprintjs/core';
import { Example } from '@blueprintjs/docs-theme';
import { Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addSpotifyAccessToken, addFBAccessToken, addFBUserId } from './actions/actions';
import Categories from './Categories/Categories';
import FBPosts from './facebook/FBPosts';
import { ReactComponent as Logo } from './icons/spotlights.svg';

import '@blueprintjs/core/lib/css/blueprint.css';
import './Home.css';

const clientId = 'ff7fe21803c54a3e8bac44b4add23e3b';
const redirectUri = 'http://localhost:3000';
const responseType = 'token';

const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
        if (item) {
            const parts = item.split('=');
            const temp = { ...initial };
            temp[parts[0]] = decodeURIComponent(parts[1]);
            return temp;
        }
        return initial;
    }, {});

const Home = props => {
    useEffect(() => {
        const token = hash.access_token;
        if (token) {
            props.addSpotifyAccessToken(token);
        }
    });
    const { fbAccessToken, spotifyAccessToken } = props;

    return (
        <div className="bp3-dark">
            <div>
                <Example>
                    <Navbar>
                        <NavbarGroup>
                            <NavbarHeading className="navbar-logo-parent">
                                <Logo className="navbar-logo" />
                            </NavbarHeading>
                            <NavbarHeading>Spotlight</NavbarHeading>
                        </NavbarGroup>
                        <NavbarGroup align={Alignment.RIGHT}>
                            <NavbarDivider />
                            {!fbAccessToken ? (
                                <FacebookLogin
                                    appId="1041946872841143"
                                    fields="name,email,picture"
                                    scope="user_posts"
                                    callback={response => {
                                        props.addFBAccessToken(response.accessToken);
                                        props.addFBUserId(response.userID);
                                    }}
                                    cssClass="navbar-fb-login"
                                />
                            ) : (
                                'Logged In FB'
                            )}
                            <NavbarDivider />
                            {!spotifyAccessToken ? (
                                <a
                                    // eslint-disable-next-line max-len
                                    href={`https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`}
                                >
                                    <Button
                                        className={Classes.MINIMAL}
                                        icon="log-in"
                                        text="Login"
                                    />
                                </a>
                            ) : (
                                'Logged In SP'
                            )}
                        </NavbarGroup>
                    </Navbar>
                </Example>
            </div>
            <div className="Home">
                <div>
                    {spotifyAccessToken ? (
                        <Link to="/category">
                            <Button>Get Categories</Button>
                        </Link>
                    ) : (
                        'Please log in to Spotify first'
                    )}
                </div>
                <div>
                    {fbAccessToken ? (
                        <Link to="/fbposts">
                            <Button>Get Posts</Button>
                        </Link>
                    ) : (
                        'Please log in to Facebook first'
                    )}
                </div>
                <Switch>
                    <Route exact path="/fbposts" component={FBPosts} />
                </Switch>
                <Switch>
                    <Route exact path="/category" component={Categories} />
                </Switch>
            </div>
        </div>
    );
};

const mapDispatchToProps = {
    addSpotifyAccessToken,
    addFBAccessToken,
    addFBUserId,
};

const mapStateToProps = state => {
    return {
        spotifyAccessToken: state.spotifyAccessToken,
        fbAccessToken: state.fbAccessToken,
        fbUserId: state.fbUserId,
    };
};

Home.propTypes = {
    addSpotifyAccessToken: PropTypes.func.isRequired,
    addFBAccessToken: PropTypes.func.isRequired,
    addFBUserId: PropTypes.func.isRequired,
    fbAccessToken: PropTypes.string,
    spotifyAccessToken: PropTypes.string,
};

Home.defaultProps = {
    fbAccessToken: null,
    spotifyAccessToken: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
