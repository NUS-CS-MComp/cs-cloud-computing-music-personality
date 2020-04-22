import DeviceDetect from '@utils/detect-device'
import NonceGenerator from '@utils/nonce-generator'

import OAuthResult from './result'

/**
 * Constants for OAuth flows
 */

const POPUP_WIDTH = window.screen.width / (2 * 1.618)
const POPUP_HEIGHT = window.screen.width / 2

const OPEN_POPUP_WINDOW = 'OPEN_POPUP_WINDOW'
const OPEN_REDIRECT = 'OPEN_REDIRECT'

/**
 * Get user experience type based on device type
 */
const getUserOAuthFlowType = () => {
    if (DeviceDetect.isMobile) return OPEN_REDIRECT
    return OPEN_POPUP_WINDOW
}

/**
 * Get options for pop-up window
 */
const getPopupWindowOptions = () => {
    const left = window.screen.width / 2 - POPUP_WIDTH / 2
    const top = window.screen.height / 2 - POPUP_HEIGHT / 2
    return `menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=${POPUP_WIDTH},height=${POPUP_HEIGHT},top=${top},left=${left}`
}

export default class OAuthService {
    /**
     * Class for generic standard OAuth service
     * @param {import("./processor").default} processor Configuration processor class
     */
    constructor(processor) {
        this.processor = processor
        this.result = new OAuthResult(this.processor.provider)

        this.fullURL = null
        this.popup = null
        this.state = null
    }

    /**
     * Main function to trigger authentication process
     * @returns {Promise<OAuthResult>} OAuth status and data result
     */
    async authenticate() {
        this.prepareParams()
        const result = await this.startOAuth()
        return result
    }

    /**
     * Helper function to construct full OAuth URL
     */
    constructFullURL() {
        const searchParams = this.processor.generateParamString()
        this.fullURL = `${this.processor.url}?${searchParams}`
    }

    /**
     * Function to prepare parameters for starting OAuth process
     * Resolve OAuth URL by supplementing parameters based on current window context
     */
    prepareParams() {
        this.processor.addParams('state', this.generateState())
        this.constructFullURL()
    }

    /**
     * Function to start OAuth process
     * Determine user experience type and handle OAuth process accordingly
     */
    async startOAuth() {
        if (this.shouldPopup) {
            let result
            try {
                result = await this.handlePopup(this.launchPopup())
            } catch (e) {
                this.result.setCancelStatus()
                result = this.result.output
            }
            return result
        }
        if (this.shouldRedirect) {
            localStorage.setItem(
                this.processor.lastLocationKey,
                window.location.pathname
            )
            window.location.href = this.fullURL
            return undefined
        }
        throw new Error('Unidentified flow type')
    }

    /**
     * Function to perform clean up before OAuth finishes for pop-up window flow
     * @returns {boolean} Boolean flag determine whether cleanup is executed
     */
    cleanupFromPopup() {
        if (!DeviceDetect.isMobile && window.opener) {
            window.opener.postMessage(this.result.output, window.opener)
            window.close()
            return true
        }
        return false
    }

    /**
     * Function to perform cleanup for redirection based OAuth process
     */
    cleanupFromRedirect() {
        localStorage.removeItem(this.processor.nonceKey)
        localStorage.removeItem(this.processor.lastLocationKey)
        return true
    }

    /**
     * Helper function to generate state string
     */
    generateState() {
        const nonce =
            localStorage.getItem(this.processor.nonceKey) ||
            NonceGenerator.generate()
        localStorage.setItem(this.processor.nonceKey, nonce)
        this.state = nonce
        return this.state
    }

    /**
     * Promise wrapper to handle message event from pop-up window
     * @param {Window} popup Pop-up Window object
     */
    handlePopup(popup) {
        return new Promise((resolve, reject) => {
            const messageEventHandler = (event) => {
                if (OAuthResult.isResult(event.data)) resolve(event.data)
            }
            const popupTick = setInterval(() => {
                const cleanup = () => {
                    clearInterval(popupTick)
                    window.removeEventListener('message', messageEventHandler)
                }
                try {
                    if (popup.document.domain === window.document.domain) {
                        if (popup.closed) cleanup()
                    }
                } catch (e) {
                    if (popup.closed) {
                        cleanup()
                        reject()
                    }
                }
            }, 1000)
            window.addEventListener('message', messageEventHandler, false)
        })
    }

    /**
     * Function to launch pop-up window
     */
    launchPopup() {
        if (this.popup) this.popup.close()
        const popupWindow = window.open(
            this.fullURL,
            this.processor.provider,
            getPopupWindowOptions()
        )
        popupWindow.opener = window
        this.popup = popupWindow
        return popupWindow
    }

    /**
     * Helper function to parse query string from OAuth window
     * @param {Record<string, string>} urlParamEntries The parameter search object in current window location
     * @returns {OAuthResult} Status metadata for OAuth process
     */
    parseToken(urlParamEntries) {
        try {
            this.processor.search.forEach((paramName) => {
                if (urlParamEntries[paramName]) {
                    this.result.addResult(paramName, urlParamEntries[paramName])
                } else {
                    throw new Error(`Unable to parse param ${paramName}`)
                }
            })
            this.result.setSuccessStatus()
        } catch (e) {
            this.result.setFailureStatus()
        }
        return this.result
    }

    /**
     * Helper function to verify OAuth state previously constructed over to the OAuth service
     * @param {string} state State value for the OAuth service
     * @returns {boolean} Boolean value with regards to the verification status
     */
    verifyState(state) {
        const nonceValue = localStorage.getItem(this.processor.nonceKey)
        localStorage.removeItem(this.processor.nonceKey)
        if (nonceValue === null || state !== nonceValue) return false
        return true
    }

    /**
     * Getter of last visited location before OAuth request
     */
    get lastLocation() {
        return localStorage.getItem(this.processor.lastLocationKey) || ''
    }

    /**
     * Getter of boolean flag of OAuth pop-up window flow type
     */
    get shouldPopup() {
        return getUserOAuthFlowType() === 'OPEN_POPUP_WINDOW'
    }

    /**
     * Getter of boolean flag of OAuth redirect flow type
     */
    get shouldRedirect() {
        return getUserOAuthFlowType() === 'OPEN_REDIRECT'
    }
}
