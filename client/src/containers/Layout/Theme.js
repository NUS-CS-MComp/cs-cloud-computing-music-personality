import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Icon from '@components/Icon'
import { toggleTheme } from '@redux/actions/theme'
import { themeSelector } from '@redux/selectors/theme'

/**
 * Theme toggler component
 */
export default () => {
    const dispatch = useDispatch()
    const currentTheme = useSelector(themeSelector)
    const isDark = currentTheme === 'dark'
    return (
        <button
            className='flex p-4 bg-background-primary'
            type='button'
            onClick={() => dispatch(toggleTheme())}
        >
            <span>
                <Icon
                    name='moon'
                    className={`h-6 md:h-8 text-header ${
                        isDark ? '' : 'hidden'
                    }`}
                />
            </span>
            <span>
                <Icon
                    name='sun'
                    className={`h-6 md:h-8 text-header ${
                        isDark ? 'hidden' : ''
                    }`}
                />
            </span>
        </button>
    )
}
