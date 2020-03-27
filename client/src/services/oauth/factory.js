import logger from '@utils/logger'

import OAuthService from '.'
import OAuthProcessor from './processor'

import OAUTH_CONFIG from './config'

class OAuthServiceFactory {
    /**
     * Singleton factory class to generate OAuthService instances
     */
    constructor() {
        this.serviceDirectory = {}
        Object.keys(OAUTH_CONFIG).forEach((configKey) => {
            if (/_OAUTH_CONFIG$/i.test(configKey)) {
                const serviceConfig = OAUTH_CONFIG[configKey]
                const processor = new OAuthProcessor(serviceConfig)
                this.serviceDirectory[
                    serviceConfig.providerName.toLowerCase()
                ] = new OAuthService(processor)
            }
        })
    }

    /**
     * Return service from the service directory
     * @param {string} providerName OAuth provider name
     * @returns {OAuthService} OAuthService instance
     */
    getOAuthService(providerName) {
        const providerNameLower = providerName.toLowerCase()
        if (!this.OAuthServices.includes(providerNameLower)) {
            logger.warn(
                `No OAuth service provider found for name ${providerName}. This might be caused by incorrect set-up in @services/oauth/config.js file.`
            )
        }
        return this.serviceDirectory[providerNameLower]
    }

    get OAuthServices() {
        return Object.keys(this.serviceDirectory)
    }
}

export default new OAuthServiceFactory()
