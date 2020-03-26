import lodash from 'lodash'

import OAUTH_CONFIG from './config'

export default class OAuthProcessor {
    /**
     * Configuration reader delegator class
     * @param {import("./config").IOAuthConfig} configEntries The configuration mapping for the OAuth service
     */
    constructor(configEntries) {
        this.parameter = configEntries.params || {}
        this.provider = configEntries.providerName
        this.search = configEntries.search
        this.url = configEntries.oauthURL

        this.nameMap = {
            ...OAuthProcessor.defaultNameMap,
            ...configEntries.nameMap,
        }
        this.resolveMap = {
            ...this.defaultResolveMap,
            ...configEntries.resolveMap,
        }
    }

    /**
     * Append new parameter to the parameter object
     * @param {string} name
     * @param {any} value
     */
    addParams(name, value) {
        if (
            this.parameter[name] != null &&
            typeof this.parameter[name] === 'object'
        ) {
            Object.assign(this.parameter[name], value)
        } else this.parameter[name] = value
    }

    /**
     * Helper function to generate search params string
     */
    generateParamString() {
        // Apply name mapping to query params if any
        this.resolveParams()
        const paramMapped = OAuthProcessor.applyMapping(
            this.parameter,
            this.nameMap
        )
        Object.keys(paramMapped).forEach((paramName) => {
            if (typeof paramMapped[paramName] === 'object') {
                paramMapped[paramName] = JSON.stringify(paramMapped[paramName])
            }
        })
        return new URLSearchParams(paramMapped).toString()
    }

    /**
     * Helper function to resolve parameters to be evaluated
     */
    resolveParams() {
        Object.keys(this.resolveMap).map((keyName) =>
            this.addParams(keyName, this.resolveMap[keyName]())
        )
    }

    get callbackURL() {
        const providerEncoded = encodeURIComponent(this.provider)
        return `${window.location.origin}/${OAUTH_CONFIG.CALL_BACK_ROUTE}?provider=${providerEncoded}`
    }

    get defaultResolveMap() {
        return {
            redirectUri: () => this.callbackURL,
        }
    }

    get nonceKey() {
        return `spotlight.oauth.${this.provider}.nonce`
    }

    get lastLocationKey() {
        return `spotlight.oauth.${this.provider}.last_location`
    }

    /**
     * Helper function to apply name mapping
     * @param {Record<string, string>} original
     * @param {Record<string, string>} mapping
     */
    static applyMapping(original, mapping) {
        const result = lodash.cloneDeep(original)
        Object.keys(mapping).forEach((keyName) => {
            if (result[keyName]) {
                result[mapping[keyName]] = result[keyName]
                delete result[keyName]
            }
        })
        return result
    }

    static get defaultNameMap() {
        return {
            clientID: 'client_id',
            redirectUri: 'redirect_uri',
            responseType: 'response_type',
        }
    }
}
