export const VALIDATE_INIT = 'VALIDATE_INIT'
export const VALIDATE_FAILURE = 'VALIDATE_FAILURE'
export const VALIDATE_SUCCESS = 'VALIDATE_SUCCESS'

export const VALIDATE_FULL_INIT = 'VALIDATE_FULL_INIT'
export const VALIDATE_FULL_COMPLETE = 'VALIDATE_FULL_COMPLETE'
export const VALIDATE_FULL_FAILURE = 'VALIDATE_FULL_FAILURE'

/**
 * Action to initiate full validation process
 */
export const initFullValidation = () => ({
    type: VALIDATE_FULL_INIT,
})

/**
 * Action to start validate provider OAuth details
 * @param {string} provider Name of social platform provider
 */
export const initValidation = (provider) => ({
    type: VALIDATE_INIT,
    provider,
})
