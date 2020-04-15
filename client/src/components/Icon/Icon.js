import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as FacebookLogo } from '@assets/facebook.svg'
import { ReactComponent as RedditLogo } from '@assets/reddit.svg'
import { ReactComponent as SpotifyLogo } from '@assets/spotify.svg'
import { ReactComponent as TwitterLogo } from '@assets/twitter.svg'

import { ReactComponent as DiscIcon } from '@assets/disc.svg'
import { ReactComponent as LogInIcon } from '@assets/log-in.svg'
import { ReactComponent as HomeIcon } from '@assets/home.svg'
import { ReactComponent as MoonIcon } from '@assets/moon.svg'
import { ReactComponent as MusicIcon } from '@assets/music.svg'
import { ReactComponent as MusicNoteIcon } from '@assets/music-note.svg'
import { ReactComponent as PlayButtonIcon } from '@assets/play.svg'
import { ReactComponent as RefreshIcon } from '@assets/refresh.svg'
import { ReactComponent as SocialIcon } from '@assets/social.svg'
import { ReactComponent as SunIcon } from '@assets/sun.svg'
import { ReactComponent as UserIcon } from '@assets/user.svg'

const ICON_NAME_MAP = {
    facebook: FacebookLogo,
    reddit: RedditLogo,
    spotify: SpotifyLogo,
    twitter: TwitterLogo,
    disc: DiscIcon,
    home: HomeIcon,
    login: LogInIcon,
    moon: MoonIcon,
    music: MusicIcon,
    'music-note': MusicNoteIcon,
    play: PlayButtonIcon,
    refresh: RefreshIcon,
    social: SocialIcon,
    sun: SunIcon,
    user: UserIcon,
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
                className={`fill-current text-${colorName} ${className}`}
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
