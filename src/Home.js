import React, { useState, useEffect } from "react";
import "./Home.css";
import { connect } from "react-redux";
import { addAccessToken } from "./actions/actions";
import Categories from "./Categories/Categories";

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
  const [categories, setCategories] = useState(0);
  useEffect(() => {
    let _token = hash.access_token;
    if (_token) {
      props.addAccessToken(_token);
    }
  });
  const handleClick = event => {
    event.preventDefault();
    fetch(`/categories?token=${encodeURIComponent(props.accessToken)}`)
      .then(response => response.json())
      .then(state => {
        setCategories(state.data.categories.items.map(v => v.name));
      });
  };
  return (
    <div className="App">
      <header className="App-header">
        {!props.accessToken ? (
          <a
            href={`https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`}
            className="btn"
          >
            Login
          </a>
        ) : (
          <form onSubmit={handleClick}>
            <button type="submit">Submit</button>
          </form>
        )}
        <Categories data={categories} />
      </header>
    </div>
  );
};

const mapDispatchToProps = {
  addAccessToken: addAccessToken
};

const mapStateToProps = state => {
  return {
    accessToken: state.accessToken
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
