import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
// react-router-dom => is a library

class DetailDoctor extends Component {
  render() {
    console.log(this.props.match.params.id);
    // console.log("Check new:",this.props.match )
    return (
      <>
        {/* Cách lấy thanh header */}
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">Doctor detail</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
