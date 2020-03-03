import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

const FBPosts = props => {
  const [posts, setPosts] = useState(0);

  useEffect(() => {
    fetch(
      `/fbPosts?accessToken=${props.fbAccessToken}&userId=${props.fbUserId}`
    )
      .then(response => response.json())
      .then(state => {
        setPosts(state.data.data.map(v => v.message));
      });
  }, [props.fbAccessToken, props.fbUserId]);

  return (
    <div>{posts ? posts.map(item => <div key={item}>{item}</div>) : ""}</div>
  );
};

const mapStateToProps = state => {
  return {
    fbAccessToken: state.fbAccessToken,
    fbUserId: state.fbUserId
  };
};

export default connect(mapStateToProps, null)(FBPosts);
