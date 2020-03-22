import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { Button } from '@blueprintjs/core'
import { Switch, Route, Link } from 'react-router-dom'

import { connect } from 'react-redux'
import {
    addSpotifyAccessToken,
    addFBAccessToken,
    addFBUserId,
} from '../../redux/actions/actions'

import Categories from '../../hooks/use-spotify/category'
import RecentlyPlayed from '../../hooks/use-spotify/recent-played'
import RecentlyPlayedFeatures from '../../hooks/use-spotify/recent-played-features'
import FBPosts from '../../hooks/use-facebook/post'

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

const Home = (props) => {
    useEffect(() => {
        const token = parseForSpotifyToken.access_token
        if (token) {
            props.addSpotifyAccessToken(token)
        }
    })
    const { fbAccessToken, spotifyAccessToken } = props

    return (
        <div className='bp3-dark'>
            <div className='Home'>
                {spotifyAccessToken ? (
                    <div>
                        <Link to='/category'>
                            <Button>Get Categories</Button>
                        </Link>
                        <Link to='/recentlyplayed'>
                            <Button>Get Recently Played</Button>
                        </Link>
                        <Link to='/recentlyplayedFeatures'>
                            <Button>Get Recently Played Features</Button>
                        </Link>
                    </div>
                ) : (
                    <div>Please log in to Spotify first</div>
                )}

                <div>
                    {fbAccessToken ? (
                        <Link to='/fbposts'>
                            <Button>Get Posts</Button>
                        </Link>
                    ) : (
                        'Please log in to Facebook first'
                    )}
                </div>
                <Switch>
                    <Route exact path='/fbposts' component={FBPosts} />
                </Switch>
                <Switch>
                    <Route exact path='/category' component={Categories} />
                </Switch>
                <Switch>
                    <Route
                        exact
                        path='/recentlyplayed'
                        component={RecentlyPlayed}
                    />
                </Switch>
                <Switch>
                    <Route
                        exact
                        path='/recentlyplayedFeatures'
                        component={RecentlyPlayedFeatures}
                    />
                </Switch>
            </div>
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

Home.propTypes = {
    addSpotifyAccessToken: PropTypes.func.isRequired,
    fbAccessToken: PropTypes.string,
    spotifyAccessToken: PropTypes.string,
}

Home.defaultProps = {
    fbAccessToken: null,
    spotifyAccessToken: null,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
