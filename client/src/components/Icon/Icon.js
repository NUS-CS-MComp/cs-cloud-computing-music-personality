import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as FacebookLogo } from '@assets/icons/facebook.svg'
import { ReactComponent as RedditLogo } from '@assets/icons/reddit.svg'
import { ReactComponent as SpotifyLogo } from '@assets/icons/spotify.svg'
import { ReactComponent as TwitterLogo } from '@assets/icons/twitter.svg'

import { ReactComponent as AIIcon } from '@assets/icons/ai.svg'
import { ReactComponent as AlertIcon } from '@assets/icons/alert.svg'
import { ReactComponent as DiscIcon } from '@assets/icons/disc.svg'
import { ReactComponent as ErrorIcon } from '@assets/icons/error.svg'
import { ReactComponent as HomeIcon } from '@assets/icons/home.svg'
import { ReactComponent as LogInIcon } from '@assets/icons/log-in.svg'
import { ReactComponent as LogOutIcon } from '@assets/icons/log-out.svg'
import { ReactComponent as MoonIcon } from '@assets/icons/moon.svg'
import { ReactComponent as MusicIcon } from '@assets/icons/music.svg'
import { ReactComponent as MusicNoteIcon } from '@assets/icons/music-note.svg'
import { ReactComponent as PlayButtonIcon } from '@assets/icons/play.svg'
import { ReactComponent as RefreshIcon } from '@assets/icons/refresh.svg'
import { ReactComponent as ScoreIcon } from '@assets/icons/score.svg'
import { ReactComponent as SocialIcon } from '@assets/icons/social.svg'
import { ReactComponent as SunIcon } from '@assets/icons/sun.svg'
import { ReactComponent as UserIcon } from '@assets/icons/user.svg'

const ICON_NAME_MAP = {
    facebook: FacebookLogo,
    reddit: RedditLogo,
    spotify: SpotifyLogo,
    twitter: TwitterLogo,
    ai: AIIcon,
    alert: AlertIcon,
    disc: DiscIcon,
    error: ErrorIcon,
    home: HomeIcon,
    login: LogInIcon,
    logout: LogOutIcon,
    moon: MoonIcon,
    music: MusicIcon,
    'music-note': MusicNoteIcon,
    play: PlayButtonIcon,
    refresh: RefreshIcon,
    score: ScoreIcon,
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
