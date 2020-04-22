export default {
    /**
     * From https://gist.github.com/6174/6062387
     * Helper function to generate nonce in state parameter
     */
    generate: () =>
        Math.random()
            .toString(36)
            .substring(2, 15) +
        Math.random()
            .toString(36)
            .substring(2, 15),
}
