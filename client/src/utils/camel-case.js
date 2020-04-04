/**
 * Helper function to convert string to camel case
 * @param {string} original Original string
 */
export default (original) =>
    original.slice(0, 1).toUpperCase() + original.slice(1).toLowerCase()
