import { createSelector } from 'reselect'

/**
 * Selector for all theme related specs
 * @param {Record<string, string>} state Store state
 */
export const themeInfoSelector = (state) => state.theme

/**
 * Selector for current theme
 */
export const themeSelector = createSelector(
    themeInfoSelector,
    (theme) => theme.theme
)
