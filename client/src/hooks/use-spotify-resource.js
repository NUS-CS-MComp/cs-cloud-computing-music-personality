import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { requestSpotifyResource } from '@redux/actions/spotify'
import {
    spotifyResourceDataSelector,
    spotifyResourceLoadingSelector,
} from '@redux/selectors/spotify'
import {
    availableProviderSelector,
    expiredProviderSelector,
} from '@redux/selectors/validate'
import Api from '@services/api'
import OAUTH_CONFIG from '@services/oauth/config'

const {
    providerName: SPOTIFY_PROVIDER_NAME,
} = OAUTH_CONFIG.SPOTIFY_OAUTH_CONFIG

/**
 * Custom hook to fetch specific resource from Spotify
 * @param {string} resourceType Spotify resource type
 * @returns {[Record<string, any>, string, boolean, boolean, function]} Data to be consumed from the hook
 */
const useSpotifyResource = (resourceType) => {
    const isAuthenticated = useSelector(availableProviderSelector).includes(
        SPOTIFY_PROVIDER_NAME
    )
    const isTokenExpired = useSelector(expiredProviderSelector).includes(
        SPOTIFY_PROVIDER_NAME
    )
    const dispatch = useDispatch()
    const dispatchCallback = useCallback(
        (...payload) => {
            if (Api.spotify.RESOURCE_API_MAP[resourceType] && isAuthenticated) {
                dispatch(requestSpotifyResource(resourceType, ...payload))
            }
        },
        [isAuthenticated, dispatch]
    )
    const data = useSelector(spotifyResourceDataSelector(resourceType)) || []
    const isLoading =
        useSelector(spotifyResourceLoadingSelector)[resourceType] || false
    return [
        data,
        SPOTIFY_PROVIDER_NAME,
        isAuthenticated || isTokenExpired,
        isLoading,
        dispatchCallback,
    ]
}

export default useSpotifyResource
