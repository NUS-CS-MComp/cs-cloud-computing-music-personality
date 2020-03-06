import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const Categories = props => {
    const [categories, setCategories] = useState(0);

    useEffect(() => {
        fetch(`/getSpotifyCategories?token=${encodeURIComponent(props.spotifyAccessToken)}`)
            .then(response => response.json())
            .then(state => {
                setCategories(state.categories.items.map(v => v.name));
            });
    }, [props.spotifyAccessToken]);

    return <div>{categories ? categories.map(item => <div key={item}>{item}</div>) : ''}</div>;
};

const mapStateToProps = state => {
    return {
        spotifyAccessToken: state.spotifyAccessToken,
    };
};

export default connect(mapStateToProps, null)(Categories);
