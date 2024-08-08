// import Component.
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginAPI } from "../../services/userService";

class Login extends Component {
  // constructor => là hàm khởi tạo
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errMessage: "",
    };
  }

  //  State để kiểm soát đc các value của các biến

  handleOnChangeUsername = (event) => {
    this.setState({
      // Update change state React
      username: event.target.value,
    });
    // console.log(event.target.value);
  };

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginAPI(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        // Login => userActions => userReducer => result.
        this.props.userLoginSuccess(data.user);
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.message,
          });
        }
      }
      // console.log("Hello", e.response);
    }
  };

  handleKeyDown = (event) => {
    console.log("Check keydown", event);
    if (event.key === "Enter") {
      this.handleLogin();
    }
  };
  // Cần quan tâm hàm render
  render() {
    // Chỉ render ra 1 element

    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={this.state.username}
                onChange={(event) => this.handleOnChangeUsername(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={(event) => this.handleOnChangePassword(event)}
                onKeyDown={(event) => this.handleKeyDown(event)}
                // value={this.state.password}
              />
            </div>
            <div className="col-12" style={{ color: "#e03131" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button
                className="btn-sub"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Submit
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot your password?</span>
            </div>
            <div className="col-12 text-center mt-4">
              <span className="text-other-login">Or Login with:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Hàm chuyển đổi language
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
