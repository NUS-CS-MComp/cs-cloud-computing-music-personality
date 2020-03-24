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
const getUserOAuthFlowType = () => {
    if (DeviceDetect.isMobile) return OPEN_REDIRECT
    return OPEN_POPUP_WINDOW
}

export default class OAuthService {
    /**
     * Class for generic standard OAuth service
     * @param {string} providerName The name of the provider
     * @param {string} oauthURL The target URL of the OAuth provider
     * @param {import('./config').IOAuthParams} paramEntries The params for the OAuth service
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
        this.nonceKey = `oauth.${providerName}.nonce`

        this.oauthResult = new OAuthResult(providerName)
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
        this.state = this.paramEntries.state || {}
    }

    /**
     * Helper function to trigger cleanup action
     * @returns {boolean} Boolean flag determine whether cleanup is executed
     */
    cleanup() {
        if (window.opener) {
            window.opener.postMessage(this.oauthResult.output, window.opener)
            window.close()
            return true
        }
        return false
    }

    /**
     * From https://gist.github.com/6174/6062387
     * Helper function to generate nonce in state parameter
     */
    generateNonce() {
        const nonceValue =
            Math.random()
                .toString(36)
                .substring(2, 15) +
            Math.random()
                .toString(36)
                .substring(2, 15)
        localStorage.setItem(this.nonceKey, nonceValue)
        return nonceValue
    }

    /**
     * OAuth handler to be passed to component that triggers relevant action
     * @param {function} messageCallback Callback function to deal with window message event
     */
    handleOAuth(messageCallback) {
        this.resolveOAuthURL()
        /**
         * Perform different flows based on device type
         */
        const messageEventHandler = (event) => {
            if (typeof messageCallback === 'function') {
                if (OAuthResult.isResult(event.data)) {
                    messageCallback(event.data)
                    window.removeEventListener('message', messageEventHandler)
                }
            }
        }
        switch (getUserOAuthFlowType()) {
            case OPEN_POPUP_WINDOW:
                this.popupWindow = window.open(
                    this.oauthFullURL,
                    this.providerName,
                    getPopupWindowOptions()
                )
                this.popupWindow.opener = window
                this.popupWindow.opener.addEventListener(
                    'message',
                    messageEventHandler,
                    false
                )
                break
            case OPEN_REDIRECT:
                window.location.href = this.oauthFullURL
                break
            default:
                break
        }
    }

    /**
     * Helper function to parse query string from OAuth window
     * @param {URLSearchParams} query The parameter search object in current window location
     * @returns {OAuthResult} Status metadata for OAuth process
     */
    parseToken(urlParams) {
        try {
            this.searchList.forEach((paramName) => {
                if (urlParams.get(paramName)) {
                    this.oauthResult.addResult(
                        paramName,
                        urlParams.get(paramName)
                    )
                } else {
                    throw new Error(`Unable to parse param ${paramName}`)
                }
            })
            this.oauthResult.setSuccessStatus()
        } catch (error) {
            this.oauthResult.setFailureStatus()
        }

        return this.oauthResult
    }

    /**
     * Resolve OAuth URL by supplementing parameters based on current window context
     */
    resolveOAuthURL() {
        this.paramEntries.redirectUri = `${window.location.origin}/${OAUTH_CONFIG.CALL_BACK_ROUTE}`
        this.state = Object.assign(this.state, {
            provider: this.providerName,
            redirected_from: window.location.pathname,
            nonce: this.generateNonce(),
        })
        this.paramEntries.state = JSON.stringify(this.state)

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
     * Helper function to verify OAuth state previously constructed over to the OAuth service
     * @param {Object} state State object for the OAuth service
     * @returns {boolean} Boolean value with regards to the verification status
     */
    verifyState(state) {
        const nonceValue = localStorage.getItem(this.nonceKey)
        localStorage.removeItem(this.nonceKey)
        if (nonceValue === null || state.nonce !== nonceValue) return false
        return true
    }

    /**
     * Helper function to parse current window location for OAuth parameters
     * @returns {URLSearchParams} The parameter search object in current window location
     */
    static parseOAuthParams() {
        const hashString = window.location.hash.slice(1)
        const searchString = window.location.search
        const urlParams = new URLSearchParams(`${hashString}&${searchString}`)
        return urlParams
    }
}
