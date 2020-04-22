import log from 'loglevel'

if (process.env.NODE_ENV === 'development') {
    log.setLevel('debug')
}

export default log
