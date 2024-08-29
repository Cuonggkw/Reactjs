import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import * as actions from "../../../store/actions";

import { withRouter } from "react-router";

import "./ListDoctor.scss";
import { LANGUAGES } from "../../../utils";

// react-router-dom => is a library

// Hiển thị thông tin doctor
class ListDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
    };
  }

  // run 1 duy nhất
  async componentDidMount() {
    this.props.loadTopDoctors();
  }

  // Chạy lại nhiều lần.
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({
        listDoctors: this.props.topDoctors,
      });
    }
  }

  handleViewDetailDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };

  render() {
    let listDoctors = this.state.listDoctors;
    let { language } = this.props;

    return (
      <div className="container">
        <HomeHeader />
        <div className="list-doctor-container">
          <div className="outstanding">Bác sĩ nổi bật</div>
          {listDoctors &&
            listDoctors.length > 0 &&
            listDoctors.map((item, index) => {
              let imageBase64 = "";
              if (item.image) {
                imageBase64 = new Buffer(item.image, "base64").toString(
                  "binary"
                );
              }
              let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
              let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
              return (
                <div className="list-doctor" key={index}>
                  <div className="content-left">
                    <div
                      className="image-list section-doctor"
                      style={{
                        backgroundImage: `url(${imageBase64}`,
                      }}
                    ></div>
                  </div>
                  <div className="content-right">
                    <div className="name-doctor">
                      {language === LANGUAGES.VI ? nameVi : nameEn}
                    </div>
                    <div className="content-specialty">{item.specialtyId}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctors: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListDoctor)
);
