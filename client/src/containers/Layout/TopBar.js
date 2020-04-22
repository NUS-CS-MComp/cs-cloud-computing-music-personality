import React from 'react'
import { useSelector } from 'react-redux'

import ThemeToggler from '@containers/Layout/Theme'
import Logout from '@containers/UserResource/Logout'
import { validityIdentifierSelector } from '@redux/selectors/validate'

/**
 * Secondary top navigation bar container
 */
export default () => {
    const hasIdentifier = useSelector(validityIdentifierSelector)
    return (
        <div className='flex flex-row-reverse'>
            <div className='ml-2 last:ml-0'>
                <ThemeToggler />
            </div>
            {hasIdentifier && (
                <div className='ml-2 last:ml-0'>
                    <Logout />
                </div>
            )}
        </div>
    )
}
