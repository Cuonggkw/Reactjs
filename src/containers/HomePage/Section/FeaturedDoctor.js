import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { withRouter } from "react-router";
class FeaturedDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({
        arrDoctors: this.props.topDoctors,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  handleViewDetailDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };

  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;

    return (
      <div className="section-share section-featured-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.outstanding-doctor" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`;
                  let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                  return (
                    <div
                      className="doctor-customize"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div className="outer-backg">
                        <div
                          className="bg-image section-doctor"
                          style={{
                            backgroundImage: `url(${imageBase64}`,
                          }}
                        ></div>
                      </div>
                      <div className="position text-center">
                        <div className="name-doctor">
                          {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                      </div>
                      <div className="text-eye">{item.address}</div>
                    </div>
                  );
                })}
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
  connect(mapStateToProps, mapDispatchToProps)(FeaturedDoctor)
);
