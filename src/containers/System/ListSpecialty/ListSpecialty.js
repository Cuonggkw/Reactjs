import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./ListSpecialty.scss";
import { getAllSpecialty } from "../../../services/userService";

import { FormattedMessage } from "react-intl";
// react-router-dom => is a library

// Hiển thị thông tin doctor
class ListSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = { dataSpecialty: [] };
  }

  // run 1 duy nhất
  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }

  // Chạy lại nhiều lần.
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { dataSpecialty } = this.state;
    console.log("Check data: ", this.state);
    return (
      <div className="container">
        <HomeHeader />
        <div className="list-specialty-container">
          <div className="outstanding">Chuyên khoa khám</div>
          <div className="section-body">
            {dataSpecialty &&
              dataSpecialty.length > 0 &&
              dataSpecialty.map((item, index) => {
                return (
                  <div className="list-specialty" key={index}>
                    <div className="content-left-list">
                      <div
                        className="image-specialty section-specialty"
                        style={{
                          backgroundImage: `url(${item.image}`,
                        }}
                      ></div>
                    </div>
                    <div className="content-right-list">
                      <div className="specialty-name">{item.name}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(ListSpecialty);
