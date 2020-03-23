import DeviceDetect from '@utils/detect-device'

import OAuthResult from './result'

import OAUTH_CONFIG from './config'

/**
 * Constants for OAuth flows
 */

const POPUP_WIDTH = 400
const POPUP_HEIGHT = 647

const OPEN_POPUP_WINDOW = 'OPEN_POPUP_WINDOW'
const OPEN_REDIRECT = 'OPEN_REDIRECT'

const OAUTH_SUCCESS = 'OAUTH_SUCCESS'
const OAUTH_FAIL = 'OAUTH_FAIL'

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

export default class OAuthService {
    /**
     * Class for generic standard OAuth service
     * @param {string} providerName The name of the provider
     * @param {string} oauthURL The target URL of the OAuth provider
     * @param {{ clientID: string, redirectUri: string, scope: string, state: string | object, responseType: string }} oauthURLParams The params for the OAuth service
     * @param {string[]} searchList List of params to parse in the callback URL
     * @param {Object} paramsNameMapping Name mapping for param keys
     */
    constructor(
        providerName,
        oauthURL,
        paramEntries,
        searchList,
        paramsNameMapping
    ) {
        this.oauthURL = oauthURL
        this.paramEntries = paramEntries
        this.paramsNameMapping = paramsNameMapping || {
            clientID: 'client_id',
            redirectUri: 'redirect_uri',
            responseType: 'response_type',
        }
        this.popupWindow = null
        this.providerName = providerName
        this.searchList = searchList
    }

    /**
     * Resolve OAuth URL by supplementing parameters based on current window context
     */
    resolveOAuthURL() {
        this.paramEntries.redirectUri = `${window.location.origin}/${OAUTH_CONFIG.CALL_BACK_ROUTE}`
        if (!this.paramEntries.state) {
            this.paramEntries.state = {}
        }
        this.paramEntries.state = JSON.stringify(
            Object.assign(this.paramEntries.state, {
                provider: this.providerName,
                redirected_from: window.location.pathname,
            })
        )

        // Apply name mapping to query table if any
        if (this.paramsNameMapping) {
            Object.keys(this.paramsNameMapping).forEach((keyName) => {
                if (this.paramEntries[keyName]) {
                    this.paramEntries[
                        this.paramsNameMapping[keyName]
                    ] = this.paramEntries[keyName]
                    delete this.paramEntries[keyName]
                }
            })
        }

        const urlParams = new URLSearchParams(this.paramEntries)
        this.oauthFullURL = `${this.oauthURL}?${urlParams.toString()}`
    }

    /**
     * OAuth handler to be passed to component that triggers relevant action
     */
    handleOAuth() {
        this.resolveOAuthURL()
        /**
         * Perform different flows based on device type
         */
        switch (getUserOauthFlowType()) {
            case OPEN_POPUP_WINDOW:
                this.popupWindow = window.open(
                    this.oauthFullURL,
                    this.providerName,
                    getPopupWindowOptions()
                )
                this.popupWindow.opener = window
                break
            case OPEN_REDIRECT:
                window.location.href = this.oauthFullURL
                break
            default:
                break
        }
    }

    async processToken() {
        if (this.popupWindow) {
            this.popupWindow.close()
        }
    }

    /**
     * Helper function to parse query string from OAuth window
     * @returns {{ status: 'OAUTH_FAIL' | 'OAUTH_SUCCESS', data: any }} Status metadata for OAuth process
     */
    parseToken(hash) {
        const urlParams = new URLSearchParams(hash)
        const result = new OAuthResult()
        try {
            this.searchList.forEach((paramName) => {
                if (urlParams.get(paramName)) {
                    result.addResult(paramName, urlParams.get(paramName))
                } else {
                    throw new Error(`Unable to parse param ${paramName}`)
                }
            })
            result.setStatus(OAUTH_SUCCESS)
        } catch (error) {
            result.setStatus(OAUTH_FAIL)
        }
        return result.output
    }
}
