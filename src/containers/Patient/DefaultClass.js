import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { FormattedMessage } from "react-intl";
// react-router-dom => is a library

// Hiển thị thông tin doctor
class DefaultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // run 1 duy nhất
  async componentDidMount() {}

  // Chạy lại nhiều lần.
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
