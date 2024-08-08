import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageShedule.scss";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";

class ManageShedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctor: [],
      selectedDoctor: "",
      currentDate: "",
      rangeTime: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllSchedule();
  }

  componentDidUpdate(prevProps, prevSate, snapshot) {
    if (prevProps.allDoctor !== this.props.allDoctor) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor);
      this.setState({
        listDoctor: dataSelect,
      });
    }
    if (prevProps.allSchedule !== this.props.allSchedule) {
      let data = this.props.allSchedule;
      if (data && data.length > 0) {
        data = data.map((item) => {
          item.isSelected = false;
          return item;
        });
      }

      console.log("Check item data:", data);
      this.setState({
        rangeTime: this.props.allSchedule,
      });
    }
    // if (prevProps.language !== this.props.language) {
    //   let dataSelect = this.buildDataInputSelect(this.props.allDoctor);
    //   this.setState({
    //     listDoctor: dataSelect,
    //   });
    // }
  }

  buildDataInputSelect = (data) => {
    let result = [];
    let { language } = this.props;
    if (data && data.length > 0) {
      data.map((item, index) => {
        let object = {};
        let labelVi = `${item.firstName} ${item.lastName}`;
        let labelEn = `${item.lastName} ${item.firstName}`;

        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor: selectedDoctor });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  render() {
    // console.log("Hoi dan it check state: ", this.state);
    let { rangeTime } = this.state;
    let { language } = this.props;

    return (
      <div className="manage-schedule-container">
        <div className="schedule-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-5 form-group">
              <label>
                <FormattedMessage id="manage-schedule.chosse-doctor" />
              </label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChangeSelect}
                options={this.state.listDoctor}
              />
            </div>
            <div className="col-5 form-group">
              <label>
                {" "}
                <FormattedMessage id="manage-schedule.chosse-date" />
              </label>
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className="form-control"
                selected={this.state.currentDate}
                minDate={new Date()}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button className="btn btn-schedule" key={index}>
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <div className="col-12">
              <button className=" btn btn-primary btn-save-schedule">
                <FormattedMessage id="manage-schedule.save" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // Check user have login
    isLoggedIn: state.user.isLoggedIn,
    allDoctor: state.admin.allDoctor,
    language: state.app.language,
    allSchedule: state.admin.allSchedule,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchAllSchedule: () => dispatch(actions.fetchAllSchedule()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageShedule);
