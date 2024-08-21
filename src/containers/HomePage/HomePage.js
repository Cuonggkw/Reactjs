import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialize from "./Section/Specialize";
import FeaturedDoctor from "./Section/FeaturedDoctor";
import HealthFacilities from "./Section/HealthFacilities";
import HandBook from "./Section/HandBook";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";
import "./HomePage.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { after } from "lodash";

class HomePage extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
    };
    return (
      <div>
        {/* Cách lấy thanh header */}
        <HomeHeader isShowBanner={true} />

        <Specialize settings={settings} />

        <HealthFacilities settings={settings} />

        <FeaturedDoctor settings={settings} />

        <HandBook settings={settings} />

        <About />

        <HomeFooter />
        <div style={{ height: "300px" }}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
