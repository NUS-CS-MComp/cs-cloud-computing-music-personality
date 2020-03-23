export default class OAuthResult {
    /**
     * Result object class for OAuth process
     */
    constructor() {
        this.data = null
        this.status = null
    }

    /**
     * Append new result to the data object
     * @param {string} name
     * @param {any} value
     */
    addResult(name, value) {
        if (!this.data) this.data = {}
        this.data[name] = value
    }

    /**
     * Set status to a certain status string
     * @param {string} status
     */
    setStatus(status) {
        this.status = status
    }

    get output() {
        return {
            data: this.data,
            status: this.status,
        }
    }
}
