import moment from 'moment'

/**
 * Helper function to format unix timestamp
 * @param {string} unixTimeStamp Unix timestamp string
 */
export default (unixTimeStamp) => {
    const time = moment.unix(unixTimeStamp).fromNow()
    return time
}
