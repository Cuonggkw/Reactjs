import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { getProfileDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { NumericFormat } from "react-number-format";
import { FormattedMessage } from "react-intl";
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

  render() {
    let { dataProfile } = this.state;
    console.log("Check dataProfile:", dataProfile);
    let { language } = this.props;
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
              {dataProfile &&
                dataProfile.Markdown &&
                dataProfile.Markdown.description && (
                  <span className="title-down">
                    {dataProfile.Markdown.description}
                  </span>
                )}
            </div>
          </div>
        </div>
        <div className="price">
          Gía khám:{" "}
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
