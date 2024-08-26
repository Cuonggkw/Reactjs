import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { getProfileDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { NumericFormat } from "react-number-format";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";
// react-router-dom => is a library

// Hiển thị thông tin doctor
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Biến lưu infor API
      dataProfile: {},
    };
  }

  // run 1 duy nhất
  async componentDidMount() {
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }

  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  // Chạy lại nhiều lần.
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      // this.getInforDoctor(this.props.doctorId);
    }
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;

      // 1 giây = 1000 mili giây (1s = 1000ms)
      // user "+" convert từ string sang kiểu int.
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return (
        <>
          <div className="date-title">
            {time} - {this.capitalizeFirstLetter(date)}
          </div>
          <div className="free-price">
            <FormattedMessage id="patient.booking-modal.priceBooking" />
          </div>
        </>
      );
    }
    return <></>;
  };

  render() {
    let { dataProfile } = this.state;
    let { language, isShowDescriptionDoctor, dataTime, doctorId } = this.props;
    let { isShowLinkDetail, isShowPrice } = this.props;
    let nameVi = "",
      nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.lastName} ${dataProfile.firstName}`;
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }
    return (
      <div className="profile-doctor-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                dataProfile && dataProfile.image ? dataProfile.image : ""
              }`,
            }}
          ></div>
          <div className="content-right">
            <div className="up">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className="down">
              {isShowDescriptionDoctor === true ? (
                <>
                  {dataProfile &&
                    dataProfile.Markdown &&
                    dataProfile.Markdown.description && (
                      <span className="title-down">
                        {dataProfile.Markdown.description}
                      </span>
                    )}
                </>
              ) : (
                <>{this.renderTimeBooking(dataTime)}</>
              )}
            </div>
          </div>
        </div>
        {isShowLinkDetail === true && (
          <div className="view-detail-doctor">
            <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
          </div>
        )}
        {isShowPrice === true && (
          <div className="price">
            <FormattedMessage id="patient.booking-modal.examination" />{" "}
            {dataProfile &&
              dataProfile.Doctor_Infor &&
              language === LANGUAGES.VI && (
                <NumericFormat
                  value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                  displayType={"text"}
                  // thousandsGroupStyle="lakh"
                  thousandSeparator={true}
                  suffix={"VND"}
                  className="currency"
                />
              )}
            {dataProfile &&
              dataProfile.Doctor_Infor &&
              language === LANGUAGES.EN && (
                <NumericFormat
                  value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"USD"}
                  className="currency"
                />
              )}
          </div>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
