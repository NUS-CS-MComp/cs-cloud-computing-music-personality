import React, { Component } from "react";

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

class Categories extends Component {
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
        token: _token,
        categories: null
      });
    }
  }
  handleClick = event => {
    event.preventDefault();
    fetch(`/categories?token=${encodeURIComponent(this.state.token)}`)
      .then(response => response.json())
      .then(state => {
        this.setState({
          categories: state.data.categories.items.map(v => v.name)
        });
      });
  };
  render() {
    return (
      <div>
        <header>
          <form onSubmit={this.handleClick}>
            <button type="submit">Submit</button>
          </form>
          {this.state.categories
            ? this.state.categories.map(item => <div key={item}>{item}</div>)
            : ""}
        </header>
      </div>
    );
  }
}

export default Categories;
