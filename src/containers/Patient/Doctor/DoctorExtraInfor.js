import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { LANGUAGES } from "../../../utils";
import { NumericFormat } from "react-number-format";
import { FormattedMessage } from "react-intl";
import { getExtraInforDoctorById } from "../../../services/userService";
// react-router-dom => is a library

// Hiển thị thông tin doctor
class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    };
  }

  // run 1 duy nhất
  async componentDidMount() {}

  // Chạy lại nhiều lần.
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };

  render() {
    let { isShowDetailInfor, extraInfor } = this.state;
    let { language } = this.props;
    console.log("Check extraInfor state:", this.state);
    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <h5 className="text-address">ĐỊA CHỈ KHÁM</h5>
          <span className="name-clinic">
            {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ""}
          </span>
          <p className="detail-address">
            {extraInfor && extraInfor.addressClinic
              ? extraInfor.addressClinic
              : ""}
          </p>
        </div>
        <div className="content-down">
          {isShowDetailInfor === false && (
            <div className="short-infor">
              GIÁ KHÁM:
              {extraInfor &&
                extraInfor.priceTypeData &&
                language === LANGUAGES.VI && (
                  <NumericFormat
                    value={extraInfor.priceTypeData.valueVi}
                    displayType={"text"}
                    // thousandsGroupStyle="lakh"
                    thousandSeparator={true}
                    suffix={"VND"}
                    className="currency"
                  />
                )}
              {extraInfor &&
                extraInfor.priceTypeData &&
                language === LANGUAGES.EN && (
                  <NumericFormat
                    value={extraInfor.priceTypeData.valueEn}
                    displayType={"text"}
                    // thousandsGroupStyle="lakh"
                    thousandSeparator={true}
                    suffix={"USD"}
                    className="currency"
                  />
                )}
              <span onClick={() => this.showHideDetailInfor(true)}>
                Xem chi tiết
              </span>
            </div>
          )}
          {isShowDetailInfor === true && (
            <>
              <div className="title-price">GIÁ KHÁM:</div>
              <div className="detail-infor">
                <div className="price">
                  <span className="left">Giá khám</span>
                  <span className="right">
                    {extraInfor &&
                      extraInfor.priceTypeData &&
                      language === LANGUAGES.VI && (
                        <NumericFormat
                          value={extraInfor.priceTypeData.valueVi}
                          displayType={"text"}
                          // thousandsGroupStyle="lakh"
                          thousandSeparator={true}
                          suffix={"VND"}
                          className="currency"
                        />
                      )}
                    {extraInfor &&
                      extraInfor.priceTypeData &&
                      language === LANGUAGES.EN && (
                        <NumericFormat
                          value={extraInfor.priceTypeData.valueEn}
                          displayType={"text"}
                          // thousandsGroupStyle="lakh"
                          thousandSeparator={true}
                          suffix={"USD"}
                          className="currency"
                        />
                      )}
                  </span>
                </div>
                <div className="note">
                  {extraInfor && extraInfor.note ? extraInfor.note : ""}
                </div>
              </div>
              <div className="payment">
                Bệnh viện có thanh toán bằng hình thức{" "}
                {extraInfor && extraInfor.paymentTypeData
                  ? extraInfor.paymentTypeData.valueVi
                  : ""}
              </div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetailInfor(false)}>
                  Ẩn bảng giá
                </span>
              </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
