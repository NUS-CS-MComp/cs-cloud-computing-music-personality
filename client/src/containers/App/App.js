import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '@redux/store'

import Layout from '@containers/Layout'
import OverviewPage from '@containers/OverviewPage'

export default () => (
    <BrowserRouter>
        <Provider store={store}>
            <Layout>
                <OverviewPage />
            </Layout>
        </Provider>
    </BrowserRouter>
)
