import React, { Component } from "react";
import "./Home.css";

const clientId = "<your client id>";
const redirectUri = "http://localhost:3000/categories";
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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null
    };
  }
  componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        token: _token
      });
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.state.token && (
            <a
              href={`https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`}
              className="btn"
            >
              Login
            </a>
          )}
          {this.state.token && window.location.hash}
        </header>
      </div>
    );
  }
}

export default Home;
