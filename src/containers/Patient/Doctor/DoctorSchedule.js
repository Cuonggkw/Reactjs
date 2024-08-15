import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { LANGUAGES } from "../../../utils";
import { Label } from "reactstrap";
import { values } from "lodash";
import localization from "moment/locale/vi";
import {
  getScheduleDoctorByDate,
  handleLoginAPI,
} from "../../../services/userService";
import moment from "moment";
// react-router-dom => is a library

// Hiển thị thông tin doctor
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvalableTime: [],
    };
  }

  // run 1 duy nhất
  async componentDidMount() {
    let { language } = this.props;
    console.log("moment vie", moment(new Date()).format("dddd-DD/MM"));
    // want use english then add variable local behind moment.
    console.log(
      "moment en",
      moment(new Date()).locale("en").format("ddd-DD/MM")
    );
    this.setArrDays(language);
  }

  setArrDays = (language) => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        object.label = moment(new Date()).add(i, "days").format("dddd-DD/MM");
      } else {
        object.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("ddd-DD/MM");
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(object);
    }

    this.setState({
      allDays: arrDate,
    });
  };

  // Chạy lại nhiều lần.
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setArrDays(this.props.language);
    }
  }
  handleOnChangeSelect = async (event) => {
    if (this.props.doctorIdFrom && this.props.doctorIdFrom !== -1) {
      let doctorId = this.props.doctorIdFrom;
      let date = event.target.value;

      let res = await getScheduleDoctorByDate(doctorId, date);
      if (res && res.errCode === 0) {
        this.setState({
          allAvalableTime: res.data ? res.data : [],
        });
      }
      console.log("Check res schedule from react:", res);
    }
  };

  render() {
    let { allDays, allAvalableTime } = this.state;
    return (
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          <select onChange={(event) => this.handleOnChangeSelect(event)}>
            {allDays &&
              allDays.length > 0 &&
              allDays.map((item, index) => {
                return (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="all-available-time">
          <div className="calendar">
            <i className="fas fa-calendar-minus">
              <span>Lịch Khám</span>
            </i>
          </div>
          <div className="time-content">
            {allAvalableTime &&
              allAvalableTime.length > 0 &&
              allAvalableTime.map((item, index) => {
                return <button key={index}>{item.timeType}</button>;
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
