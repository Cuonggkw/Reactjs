// file run first

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";

import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";
import Doctor from "../routes/Doctor.js";

import Home from "../routes/Home";
import Login from "./Auth/Login";
import System from "../routes/System";

import { CustomToastCloseButton } from "../components/CustomToast";
import HomePage from "./HomePage/HomePage.js";
import CustomScrollbars from "../components/CustomScrollbars.js";
import DetailDoctor from "./Patient/Doctor/DetailDoctor.js";
import VerifyEmail from "./Patient/VerifyEmail.js";
import DetailSpecialty from "./Patient/Specialty/DetailSpecialty.js";
import DetailHandBook from "./Patient/HandBook/DetailHandBook.js";
import DetailClinic from "./Patient/Clinic/DetailClinic.js";
import ListDoctor from "./System/ListDoctor/ListDoctor.js";
import ListSpecialty from "./System/ListSpecialty/ListSpecialty.js";
//
class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  // JSX chính là hàm render
  render() {
    return (
      <Fragment>
        {/* Lưu lại history bên phía fontend */}
        <Router history={history}>
          <div className="main-container">
            {/* Check Login */}

            <div className="content-container">
              <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                <Switch>
                  <Route path={path.HOME} exact component={Home} />
                  <Route
                    path={path.LOGIN}
                    component={userIsNotAuthenticated(Login)}
                  />
                  <Route
                    path={path.SYSTEM}
                    component={userIsAuthenticated(System)}
                  />
                  <Route
                    path={"/doctor/"}
                    component={userIsAuthenticated(Doctor)}
                  />
                  <Route path={path.HOMEPAGE} component={HomePage} />
                  <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                  <Route
                    path={path.DETAIL_SPECIALTY}
                    component={DetailSpecialty}
                  />
                  <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                  <Route
                    path={path.DETAIL_HANDBOOK}
                    component={DetailHandBook}
                  />
                  <Route path={path.LIST_DOCTOR} component={ListDoctor} />
                  <Route
                    path={path.LIST_SPECIALIZE}
                    component={ListSpecialty}
                  />
                  {/* <Route path={path.BOOKING_CARE} component={Hello} /> */}
                  <Route
                    path={path.VERIFY_EMAIL_BOOKING}
                    component={VerifyEmail}
                  />
                </Switch>
              </CustomScrollbars>
            </div>

            <ToastContainer
              position="bottom-right"
              autoClose={6000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
