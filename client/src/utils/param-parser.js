export default {
    /**
     * Helper function to parse current window location for OAuth parameters
     * @returns {URLSearchParams} The parameter search object in current window location
     */
    parse: () => {
        const hashString = window.location.hash.slice(1)
        const searchString = window.location.search
        const urlParams = new URLSearchParams(`${searchString}&${hashString}`)
        return Object.fromEntries(urlParams)
    },
}
