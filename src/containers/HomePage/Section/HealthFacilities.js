import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class HealthFacilities extends Component {
  render() {
    return (
      <div className="section-share section-medicales">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế nổi bật</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="medical-customize">
                <div className="bg-image section-medical"></div>
                <h3>Bệnh viện chợ gẫy 1</h3>
              </div>
              <div className="medical-customize">
                <div className="bg-image section-medical"></div>
                <h3>Bệnh viện chợ gẫy 2</h3>
              </div>
              <div className="medical-customize">
                <div className="bg-image section-medical"></div>
                <h3>Bệnh viện chợ gẫy 3</h3>
              </div>
              <div className="medical-customize">
                <div className="bg-image section-medical"></div>
                <h3>Bệnh viện chợ gẫy 4</h3>
              </div>
              <div className="medical-customize">
                <div className="bg-image section-medical"></div>
                <h3>Bệnh viện chợ gẫy 5</h3>
              </div>
              <div className="medical-customize">
                <div className="bg-image section-medical"></div>
                <h3>Bệnh viện chợ gẫy 6</h3>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HealthFacilities);
