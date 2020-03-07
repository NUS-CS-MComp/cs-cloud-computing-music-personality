import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const RecentlyPlayed = props => {
    const [recentlyPlayed, setrecentlyPlayed] = useState(0);
    const { spotifyAccessToken } = props;
    useEffect(() => {
        if (spotifyAccessToken) {
            fetch(`/getSpotifyRecentlyPlayed?token=${encodeURIComponent(spotifyAccessToken)}`)
                .then(response => response.json())
                .then(state => {
                    setrecentlyPlayed(state.items.map(v => v.track.name));
                });
        }
    }, [spotifyAccessToken]);

    if (!spotifyAccessToken) {
        return null;
    }

    return (
        <div>{recentlyPlayed ? recentlyPlayed.map(item => <div key={item}>{item}</div>) : ''}</div>
    );
};

const mapStateToProps = state => {
    return {
        spotifyAccessToken: state.spotifyAccessToken,
    };
};

RecentlyPlayed.propTypes = {
    spotifyAccessToken: PropTypes.string,
};

RecentlyPlayed.defaultProps = {
    spotifyAccessToken: null,
};

export default connect(mapStateToProps, null)(RecentlyPlayed);
