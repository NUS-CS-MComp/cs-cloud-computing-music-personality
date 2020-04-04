import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as FacebookLogo } from '@assets/facebook.svg'
import { ReactComponent as RedditLogo } from '@assets/reddit.svg'
import { ReactComponent as TwitterLogo } from '@assets/twitter.svg'
import { ReactComponent as RefreshLogo } from '@assets/refresh.svg'

const ICON_NAME_MAP = {
    facebook: FacebookLogo,
    reddit: RedditLogo,
    twitter: TwitterLogo,
    refresh: RefreshLogo,
}

/**
 * Component to convert string to corresponding icon
 */
const Icon = ({ className, name }) => {
    const IconComponent = ICON_NAME_MAP[name]
    if (typeof IconComponent !== 'undefined') {
        return <IconComponent className={`h-6 ${className}`} />
    }
    return undefined
}

Icon.propTypes = {
    /**
     * Class name for styling
     */
    className: PropTypes.string,
    /**
     * Icon name
     */
    name: PropTypes.string.isRequired,
}

Icon.defaultProps = {
    className: '',
}

export default Icon
