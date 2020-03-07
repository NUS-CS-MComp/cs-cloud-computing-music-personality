import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Categories = props => {
    const [categories, setCategories] = useState(0);
    const { spotifyAccessToken } = props;

    useEffect(() => {
        if (spotifyAccessToken) {
            fetch(`/getSpotifyCategories?token=${encodeURIComponent(spotifyAccessToken)}`)
                .then(response => response.json())
                .then(state => {
                    setCategories(state.categories.items.map(v => v.name));
                });
        }
    }, [spotifyAccessToken]);

    if (!spotifyAccessToken) {
        return null;
    }

    return <div>{categories ? categories.map(item => <div key={item}>{item}</div>) : ''}</div>;
};

const mapStateToProps = state => {
    return {
        spotifyAccessToken: state.spotifyAccessToken,
    };
};

Categories.propTypes = {
    spotifyAccessToken: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Categories);
