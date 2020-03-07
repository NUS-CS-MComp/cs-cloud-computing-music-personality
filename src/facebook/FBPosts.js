import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const FBPosts = props => {
    const [posts, setPosts] = useState(0);
    const { fbAccessToken, fbUserId } = props;

    useEffect(() => {
        if (fbAccessToken) {
            fetch(`/getFacebookPosts?accessToken=${fbAccessToken}&userId=${fbUserId}`)
                .then(response => response.json())
                .then(state => {
                    setPosts(state.data.map(v => v.message));
                });
        }
    }, [fbAccessToken, fbUserId]);

    if (!fbAccessToken) {
        return null;
    }

    return <div>{posts ? posts.map(item => <div key={item}>{item}</div>) : ''}</div>;
};

const mapStateToProps = state => {
    return {
        fbAccessToken: state.fbAccessToken,
        fbUserId: state.fbUserId,
    };
};

FBPosts.propTypes = {
    fbAccessToken: PropTypes.string.isRequired,
    fbUserId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(FBPosts);
