import { TOGGLE_THEME } from '@redux/actions/theme'

/**
 * Reducer for toggle site theme
 * @param {Record<string, string>} state Theme toggling state
 * @param {{ type: string }} action Action type and payload data for theme toggling
 */
export default (
    state = { theme: localStorage.getItem('theme') || 'light' },
    { type }
) => {
    switch (type) {
        case TOGGLE_THEME:
            localStorage.setItem(
                'theme',
                state.theme === 'light' ? 'dark' : 'light'
            )
            return {
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light',
            }
        default:
            return state
    }
}
