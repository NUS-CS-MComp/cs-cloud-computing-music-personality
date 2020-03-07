import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const RecentlyPlayedFeatures = props => {
    const [recentlyPlayedFeatures, setrecentlyPlayedFeatures] = useState(0);
    const { spotifyAccessToken } = props;
    useEffect(() => {
        if (spotifyAccessToken) {
            fetch(
                `/getSpotifyRecentlyPlayedFeatures?token=${encodeURIComponent(spotifyAccessToken)}`,
            )
                .then(response => response.json())
                .then(state => {
                    setrecentlyPlayedFeatures(state.features);
                });
        }
    }, [spotifyAccessToken]);

    if (!spotifyAccessToken) {
        return null;
    }

    const parseToTable = obj => (
        <tr>
            {/* eslint-disable no-unused-vars */}
            {Object.entries(obj).map(([key, value]) => {
                return <td>{value}</td>;
            })}
        </tr>
    );

    return (
        <div>
            <table style={{ width: '100%' }} border="1">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Acousticness</th>
                        <th>analysis_url</th>
                        <th>Danceability</th>
                        <th>duration_ms</th>
                        <th>energy</th>
                        <th>instrumentalness</th>
                        <th>key</th>
                        <th>liveness</th>
                        <th>loudness</th>
                        <th>mode</th>
                        <th>speechiness</th>
                        <th>tempo</th>
                        <th>time_signature</th>
                        <th>track_href</th>
                        <th>track_name</th>
                        <th>type</th>
                        <th>uri</th>
                        <th>valence</th>
                    </tr>
                    {recentlyPlayedFeatures
                        ? recentlyPlayedFeatures.map(item => parseToTable(item))
                        : ''}
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        spotifyAccessToken: state.spotifyAccessToken,
    };
};

RecentlyPlayedFeatures.propTypes = {
    spotifyAccessToken: PropTypes.string,
};

RecentlyPlayedFeatures.defaultProps = {
    spotifyAccessToken: null,
};

export default connect(mapStateToProps, null)(RecentlyPlayedFeatures);
