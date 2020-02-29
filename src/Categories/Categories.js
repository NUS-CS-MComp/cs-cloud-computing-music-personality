import React, { Component } from "react";
import { connect } from "react-redux";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null
    };
  }
  render() {
    return (
      <div>
        <header>
          {this.props.data
            ? this.props.data.map(item => <div key={item}>{item}</div>)
            : ""}
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.accessToken
  };
};
export default connect(mapStateToProps, null)(Categories);
