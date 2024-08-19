import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
// react-router-dom => is a library

// Hiển thị thông tin doctor
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // run 1 duy nhất
  async componentDidMount() {}

  // Chạy lại nhiều lần.
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { isOpenModal, closeBookingModal, dataTime } = this.props;
    let doctorId = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }
    // let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";
    console.log("data props from modal dataTime:", dataTime);
    return (
      <Modal
        isOpen={isOpenModal}
        // toggle={this.toggle}
        size="lg"
        centered
        className={"booking-modal-container"}
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">Thông tin đặt lịch khám bệnh</span>
            <span className="right" onClick={closeBookingModal}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modal-body container">
            {/* {JSON.stringify(dataScheduleTimeModal)} */}

            <div className="doctor-infor">
              <ProfileDoctor doctorId={doctorId} />
            </div>
            <div className="row">
              <div className="col-6 form-group">
                <label>Họ tên:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label>Số điện thoại:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label>Email:</label>
                <input type="email" className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label>Địa chỉ liên hệ:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-12 form-group">
                <label>Lý do khám</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label>Đặt cho ai</label>
                <input type="email" className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label>Giới tính</label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button className="btn-booking-confirm">Xác nhận</button>
            <button className="btn-booking-cancel" onClick={closeBookingModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
