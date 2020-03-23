import OAuthService from './service'

import OAUTH_CONFIG from './config'

class OAuthServiceFactory {
    constructor() {
        this.serviceDirectory = {}
        Object.keys(OAUTH_CONFIG).forEach((configKey) => {
            if (/_OAUTH_CONFIG$/i.test(configKey)) {
                const serviceConfig = OAUTH_CONFIG[configKey]
                this.serviceDirectory[
                    serviceConfig.providerName
                ] = new OAuthService(
                    serviceConfig.providerName,
                    serviceConfig.oauthURL,
                    serviceConfig.params,
                    serviceConfig.search,
                    serviceConfig.processNameMapping
                )
            }
        })
    }

    /**
     * Return service from the service directory
     * @param {string} providerName
     * @returns {undefined | OAuthService} OAuthService instance
     */
    getOAuthServer(providerName) {
        return this.serviceDirectory[providerName]
    }
}

export default new OAuthServiceFactory()
