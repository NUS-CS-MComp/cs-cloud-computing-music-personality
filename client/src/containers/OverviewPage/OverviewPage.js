import React from 'react'
import { useSelector } from 'react-redux'

import { Switch, Route, Link } from 'react-router-dom'

import Categories from '@hooks/use-spotify/category'
import RecentlyPlayed from '@hooks/use-spotify/recent-played'
import RecentlyPlayedFeatures from '@hooks/use-spotify/recent-played-features'
import FBPosts from '@hooks/use-facebook/post'
import { providerStatusSelector } from '@redux/selectors/oauth'

export default () => {
    const token = useSelector(providerStatusSelector)
    return (
        <div className='px-6 break-words'>
            <span>{JSON.stringify(token)}</span>
            <div className='hidden'>
                <div>
                    <Link to='/category'>
                        <button type='button'>Get Categories</button>
                    </Link>
                    <Link to='/recentlyplayed'>
                        <button type='button'>Get Recently Played</button>
                    </Link>
                    <Link to='/recentlyplayedFeatures'>
                        <button type='button'>
                            Get Recently Played Features
                        </button>
                    </Link>
                </div>

                <div>
                    <Link to='/fbposts'>
                        <button type='button'>Get Posts</button>
                    </Link>
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
