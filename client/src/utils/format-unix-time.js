import moment from 'moment'

/**
 * Helper function to format unix timestamp
 * @param {string} unixTimeStamp Unix timestamp string
 */
export default (unixTimeStamp) => {
    const time = moment.unix(unixTimeStamp).format('h:mm:ss a, D MMM YYYY')
    return time
}
