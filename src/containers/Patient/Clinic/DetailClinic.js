import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DetailClinic.scss";
import HomeHeader from "../../HomePage/HomeHeader";

import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import HomeFooter from "../../HomePage/Section/HomeFooter";
import { getAllDetailClinicById } from "../../../services/userService";

import _, { indexOf } from "lodash";
import { LANGUAGES } from "../../../utils";
// react-router-dom => is a library

// Hiển thị thông tin doctor
class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: [],
      listProvince: [],
    };
  }

  // run 1 duy nhất
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let res = await getAllDetailClinicById({
        id: id,
      });

      if (res && res.errCode === 0) {
        this.setState({
          dataDetailClinic: res.data,
        });
      }

      let result = await getAllDetailClinicById({
        id: id,
      });

      if (result && result.errCode === 0) {
        let data = result.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailClinic: result.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  }

  // Chạy lại nhiều lần.
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { arrDoctorId, dataDetailClinic } = this.state;
    let { language } = this.props;

    return (
      <div className="detail-clinic-container">
        <HomeHeader />

        <div className="detail-clinic-body">
          <div className="description-clinic">
            {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
              <>
                <div className="infor-clinic">
                  <div
                    className="clinic-img"
                    style={{
                      backgroundImage: `url(${
                        dataDetailClinic && dataDetailClinic.image
                          ? dataDetailClinic.image
                          : ""
                      }`,
                    }}
                  ></div>
                  <div>
                    <div className="clinic-name">{dataDetailClinic.name}</div>
                    <div className="clinic">{dataDetailClinic.address}</div>
                  </div>
                </div>

                <div
                  dangerouslySetInnerHTML={{
                    __html: dataDetailClinic.descriptionHTML,
                  }}
                ></div>
              </>
            )}
          </div>

          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="each-doctor" key={index}>
                  <div className="dt-content-left">
                    <div className="profile-doctor">
                      <ProfileDoctor
                        doctorId={item}
                        isShowDescriptionDoctor={true}
                        isShowLinkDetail={true}
                        isShowPrice={false}
                        // dataTime={dataTime}
                      />
                    </div>
                  </div>
                  <div className="dt-content-right">
                    <div className="doctor-schedule">
                      <DoctorSchedule doctorIdFromParent={item} />
                    </div>
                    <div className="doctor-extra-infor">
                      <DoctorExtraInfor doctorIdFromParent={item} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div>
          <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
