import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as FacebookLogo } from '@assets/facebook.svg'
import { ReactComponent as RedditLogo } from '@assets/reddit.svg'
import { ReactComponent as SpotifyLogo } from '@assets/spotify.svg'
import { ReactComponent as TwitterLogo } from '@assets/twitter.svg'
import { ReactComponent as RefreshLogo } from '@assets/refresh.svg'

const ICON_NAME_MAP = {
    facebook: FacebookLogo,
    reddit: RedditLogo,
    spotify: SpotifyLogo,
    twitter: TwitterLogo,
    refresh: RefreshLogo,
}

/**
 * Component to convert string to corresponding icon
 */
const Icon = ({ className, name, color }) => {
    const IconComponent = ICON_NAME_MAP[name]
    const colorName = color === '' ? name : color
    if (typeof IconComponent !== 'undefined') {
        return (
            <IconComponent
                className={`fill-current h-6 text-${colorName} ${className}`}
            />
        )
    }
    return null
}

Icon.propTypes = {
    /**
     * Class name for styling
     */
    className: PropTypes.string,
    /**
     * Alternate color name
     */
    color: PropTypes.string,
    /**
     * Icon name
     */
    name: PropTypes.string.isRequired,
}

Icon.defaultProps = {
    className: '',
    color: '',
}

export default Icon
