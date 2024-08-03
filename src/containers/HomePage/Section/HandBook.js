import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import specializeImg from "../../../assets/spcialize/co-xuong-khop.png";

class HandBook extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div className="section-share section-handbooks">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cẩm nang</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="handbook-customize">
                <div className="bg-image section-handbook"></div>
                <h3>Cơ xương khớp 1</h3>
              </div>
              <div className="handbook-customize">
                <div className="bg-image section-handbook"></div>
                <h3>Cơ xương khớp 2</h3>
              </div>
              <div className="handbook-customize">
                <div className="bg-image section-handbook"></div>
                <h3>Cơ xương khớp 3</h3>
              </div>
              <div className="handbook-customize">
                <div className="bg-image section-handbook"></div>
                <h3>Cơ xương khớp 4</h3>
              </div>
              <div className="handbook-customize">
                <div className="bg-image section-handbook"></div>
                <h3>Cơ xương khớp 5</h3>
              </div>
              <div className="handbook-customize">
                <div className="bg-image section-handbook"></div>
                <h3>Cơ xương khớp 6</h3>
              </div>
            </Slider>
          </div>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
