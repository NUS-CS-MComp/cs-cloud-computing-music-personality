import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '@redux/store'

import FallbackLayout from '@components/FallbackLayout'
import Layout from '@containers/Layout'
import ThemeToggle from '@containers/ThemeToggle'
import NotFound from '@components/NotFound'
import SessionValidate from '@containers/SessionValidate'
import OAuthCallbackPage from '@pages/OAuthCallbackPage'
import InsightsPage from '@pages/InsightsPage'
import OverviewPage from '@pages/OverviewPage'
import UserPage from '@pages/UserPage'

import OAUTH_CONFIG from '@services/oauth/config'

/**
 * Define routes using fallback layout, e.g. authentication, callback etc.
 */
const FallbackLayoutComponent = () => (
    <FallbackLayout>
        <Switch>
            <Route
                exact
                path={`/${OAUTH_CONFIG.CALL_BACK_ROUTE}`}
                component={OAuthCallbackPage}
            />
        </Switch>
    </FallbackLayout>
)

/**
 * Define routes using public layout
 */
const PublicLayoutComponent = () => (
    <Layout>
        <SessionValidate>
            <Switch>
                <Route exact path='/' component={OverviewPage} />
                <Route exact path='/insights' component={InsightsPage} />
                <Route exact path='/me' component={UserPage} />
                <Route exact path='/not-found' component={NotFound} />
                <Redirect exact to='/not-found' />
            </Switch>
        </SessionValidate>
    </Layout>
)

/**
 * Top-level application container
 */
export default () => (
    <BrowserRouter>
        <Provider store={store}>
            <ThemeToggle>
                <Switch>
                    <Route
                        exact
                        path={[`/${OAUTH_CONFIG.CALL_BACK_ROUTE}`]} // Path to use fallback layout
                        component={FallbackLayoutComponent}
                    />
                    <Route path='/' component={PublicLayoutComponent} />
                </Switch>
            </ThemeToggle>
        </Provider>
    </BrowserRouter>
)
