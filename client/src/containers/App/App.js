import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '@redux/store'

import FallbackLayout from '@components/FallbackLayout'
import NotFoundPage from '@components/NotFoundPage'
import Layout from '@containers/Layout'
import OAuthCallbackPage from '@containers/OAuthCallbackPage'
import OverviewPage from '@containers/OverviewPage'
import SessionValidate from '@containers/SessionValidate'

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
                <Route exact path='/not-found' component={NotFoundPage} />
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
            <Switch>
                <Route
                    exact
                    path={[`/${OAUTH_CONFIG.CALL_BACK_ROUTE}`]} // Path to use fallback layout
                    component={FallbackLayoutComponent}
                />
                <Route path='/' component={PublicLayoutComponent} />
            </Switch>
        </Provider>
    </BrowserRouter>
)
