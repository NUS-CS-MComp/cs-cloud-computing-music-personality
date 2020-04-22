import lodash from 'lodash'
import { createSelector } from 'reselect'

/**
 * Selector for user related state
 * @param {Record<string, string>} state Store state
 */
export const userSelector = (state) => state.user

/**
 * Selector for user information
 * @param {Record<string, string>} state Store state
 */
export const userInfoSelector = (state) => userSelector(state).info.data

/**
 * Selector for current user connections
 */
export const userConnectionSelector = createSelector(
    userInfoSelector,
    (info) => lodash.pick(info, 'provider').provider
)

/**
 * Selector for current user profile
 */
export const userProfileSelector = createSelector(userInfoSelector, (info) =>
    lodash.omit(info, 'provider')
)

/**
 * Selector for user insights data
 */
export const userInsightsSelector = createSelector(
    userInfoSelector,
    (info) => lodash.pick(info, 'insights').insights || {}
)
