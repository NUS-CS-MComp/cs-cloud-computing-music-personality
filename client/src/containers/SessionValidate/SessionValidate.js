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
    const { is_loading: loading } = useSelector(validitySelector)
    useEffect(() => {
        dispatch(initFullValidation())
    }, [dispatch])
    if (loading) return <div>loading</div>
    return children
}

SessionValidate.propTypes = {
    /**
     * React children node
     */
    children: PropTypes.node.isRequired,
}

export default SessionValidate
