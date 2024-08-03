import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <p>
          &copy; 2024 Phạm Quốc Cường. More Information,
          <a
            target="_blank"
            href="https://web.facebook.com/profile.php?id=100011258555032"
          >
            Click here
          </a>
        </p>
      </div>
    );
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    language: state.app.language, // language take it over props
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

// Help connect between react with redux
export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
