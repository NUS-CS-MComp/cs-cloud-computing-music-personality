import lodash from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { initFullValidation } from '@redux/actions/validate'
import { validitySelector } from '@redux/selectors/validate'

/**
 * Wrapper container for loading session validation status
 */
const SessionValidate = ({ children }) => {
    const dispatch = useDispatch()
    const verification = useSelector(validitySelector)

    useEffect(() => {
        dispatch(initFullValidation())
        const recurringValidation = setInterval(() => {
            dispatch(initFullValidation())
        }, 1000 * 60 * 60)
        return () => {
            clearInterval(recurringValidation)
        }
    }, [dispatch])

    if (lodash.isEmpty(verification) || verification.loading)
        return (
            <div className='h-full flex items-center justify-center'>
                <span className='uppercase font-bold'>Logging You In</span>
            </div>
        )
    return children
}

SessionValidate.propTypes = {
    /**
     * React children node
     */
    children: PropTypes.node.isRequired,
}

export default SessionValidate
