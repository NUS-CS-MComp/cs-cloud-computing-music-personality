import React, { Component } from "react";
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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null
    };
  }
  componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      this.props.addAccessToken(_token);
    }
  }
  handleClick = event => {
    event.preventDefault();
    fetch(`/categories?token=${encodeURIComponent(this.props.accessToken)}`)
      .then(response => response.json())
      .then(state => {
        this.setState({
          categories: state.data.categories.items.map(v => v.name)
        });
      });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.props.accessToken && (
            <a
              href={`https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`}
              className="btn"
            >
              Login
            </a>
          )}
          {this.props.accessToken && (
            <form onSubmit={this.handleClick}>
              <button type="submit">Submit</button>
            </form>
          )}
          <Categories data={this.state.categories} />
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addAccessToken: addAccessToken
};

const mapStateToProps = state => {
  return {
    accessToken: state.accessToken
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
