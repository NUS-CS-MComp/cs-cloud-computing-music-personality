import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  addSpotifyAccessToken,
  addFBAccessToken,
  addFBUserId
} from "./actions/actions";
import Categories from "./Categories/Categories";
import FBPosts from "./facebook/FBPosts";
import FacebookLogin from "react-facebook-login";
import {
  Alignment,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Button,
  Classes
} from "@blueprintjs/core";
import { Example } from "@blueprintjs/docs-theme";
import { ReactComponent as Logo } from "./icons/spotlights.svg";
import { Switch, Route, Link } from "react-router-dom";

import "@blueprintjs/core/lib/css/blueprint.css";
import "./Home.css";

const clientId = "ff7fe21803c54a3e8bac44b4add23e3b";
const redirectUri = "http://localhost:3000";
const responseType = "token";

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

const Home = props => {
  useEffect(() => {
    let _token = hash.access_token;
    if (_token) {
      props.addSpotifyAccessToken(_token);
    }
  });

  return (
    <div className="bp3-dark">
      <div>
        <Example>
          <Navbar>
            <NavbarGroup>
              <NavbarHeading className="navbar-logo-parent">
                <Logo className="navbar-logo" />
              </NavbarHeading>
              <NavbarHeading>Spotlight</NavbarHeading>
            </NavbarGroup>
            <NavbarGroup align={Alignment.RIGHT}>
              <NavbarDivider />
              {!props.fbAccessToken ? (
                <FacebookLogin
                  appId="<your fb app id here>"
                  fields="name,email,picture"
                  scope="user_posts"
                  callback={response => {
                    props.addFBAccessToken(response.accessToken);
                    props.addFBUserId(response.userID);
                  }}
                  cssClass="navbar-fb-login"
                />
              ) : (
                "Logged In FB"
              )}
              <NavbarDivider />
              {!props.spotifyAccessToken ? (
                <a
                  href={`https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`}
                >
                  <Button
                    className={Classes.MINIMAL}
                    icon="log-in"
                    text="Login"
                  />
                </a>
              ) : (
                "Logged In SP"
              )}
            </NavbarGroup>
          </Navbar>
        </Example>
      </div>
      <div className="Home">
        {!props.spotifyAccessToken && "Please log in to Spotify first"}
        {!props.addFBAccessToken && "Please log in to Facebook first"}
        {props.spotifyAccessToken && (
          <div>
            <Link to="/category">
              <Button>Get Categories</Button>
            </Link>
          </div>
        )}
        {props.fbAccessToken && (
          <div>
            <Link to="/fbposts">
              <Button>Get Posts</Button>
            </Link>
          </div>
        )}
        <Switch>
          <Route exact path="/fbposts" component={FBPosts} />
        </Switch>
        <Switch>
          <Route exact path="/category" component={Categories} />
        </Switch>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  addSpotifyAccessToken: addSpotifyAccessToken,
  addFBAccessToken: addFBAccessToken,
  addFBUserId: addFBUserId
};

const mapStateToProps = state => {
  return {
    spotifyAccessToken: state.spotifyAccessToken,
    fbAccessToken: state.fbAccessToken,
    fbUserId: state.fbUserId
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
