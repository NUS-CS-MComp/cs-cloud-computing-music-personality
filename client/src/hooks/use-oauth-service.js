import { useCallback } from 'react'

import DeviceDetect from '@utils/detect-device'

const POPUP_WIDTH = 400
const POPUP_HEIGHT = 647

const OPEN_POPUP_WINDOW = 'OPEN_POPUP_WINDOW'
const OPEN_REDIRECT = 'OPEN_REDIRECT'

/**
 * Get options for pop-up window
 */
const getPopupWindowOptions = () => {
    const left = window.screen.width / 2 - POPUP_WIDTH / 2
    const top = window.screen.height / 2 - POPUP_HEIGHT / 2
    return `menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=${POPUP_WIDTH},height=${POPUP_HEIGHT},top=${top},left=${left}`
}

/**
 * Get user experience type based on device type
 */
const getUserOauthFlowType = () => {
    if (DeviceDetect.isMobile) return OPEN_REDIRECT
    return OPEN_POPUP_WINDOW
}

/**
 *
 * @param {string} providerName The name of the provider
 * @param {string} oauthURL The target URL of the OAuth provider
 * @param {{ clientID: string, redirectUri: string, scope: string, state: string | object, responseType: string }} oauthURLParams The params for the OAuth service
 * @param {Object} insertURLParams Extra params to passed for the OAuth URL
 */
const useOauthService = (
    providerName,
    oauthURL,
    { clientID, redirectUri, scope, state, responseType, ...rest },
    insertURLParams,
    nameMapping = {
        clientID: 'client_id',
        redirectUri: 'redirect_uri',
        responseType: 'response_type',
    }
) => {
    const oauthHandler = useCallback(() => {
        const paramEntries = {
            clientID,
            redirectUri,
            responseType,
            scope,
            ...JSON.stringify(state),
            ...rest,
            ...insertURLParams,
        }
        if (nameMapping) {
            Object.keys(nameMapping).forEach((keyName) => {
                if (paramEntries[keyName]) {
                    paramEntries[nameMapping[keyName]] = paramEntries[keyName]
                    delete paramEntries[keyName]
                }
            })
        }
        const urlParams = new URLSearchParams(paramEntries)
        const oauthFullURL = `${oauthURL}?${urlParams.toString()}`

        const flowType = getUserOauthFlowType()
        if (flowType === OPEN_POPUP_WINDOW) {
            const authWindow = window.open(
                oauthFullURL,
                providerName,
                getPopupWindowOptions()
            )
            authWindow.opener = window
            window.addEventListener(
                'message',
                (event) => {
                    if (event.data) authWindow.close()
                },
                false
            )
        }
        if (flowType === OPEN_REDIRECT) {
            window.location.href = oauthFullURL
        }
    }, [])
    return [oauthHandler]
}

export default useOauthService
