import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import logo from "../../../assets/image.png";
import { withRouter } from "react-router";
import "./HomeFooter.scss";

import images_1 from "../../../assets/Footer/093706-hellodoctorlogo.png";
import images_2 from "../../../assets/Footer/082316-logo-bernard.png";
import images_3 from "../../../assets/Footer/064252-doctor-check-2.png";

class HomeFooter extends Component {
  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  render() {
    return (
      <div className="home-footer">
        <div className="home-footer-container">
          <div className="address-infor">
            <div className="address-title-hn">
              <div className="address-title">
                Công ty Cổ phần Công nghệ BookingCare
              </div>
              <div className="content-address">
                <i className="fas fa-map-marker-alt"></i>
                <p>
                  Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận
                  Cầu Giấy, Thành phố Hà Nội, Việt Nam
                </p>
              </div>
              <div className="content-address">
                <i className="fas fa-mobile-alt"></i>
                <p>024-7301-2468 (7h - 18h)</p>
              </div>
              <div className="content-address">
                <i className="far fa-envelope"></i>
                <p>support@bookingcare.vn (7h - 18h)</p>
              </div>
            </div>
            <div className="address-title-hn">
              <div className="address-title">Văn phòng tại TP Hồ Chí Minh</div>
              <div className="content-address">
                <i className="fas fa-map-marker-alt"></i>
                <p>Tòa nhà H3, 384 Hoàng Diệu, Phường 6, Quận 4, TP.HCM</p>
              </div>
            </div>
          </div>
          <div className="bookingcare">
            <img
              className="logo-booking"
              src={logo}
              onClick={() => this.returnToHome()}
            />
            <div className="bookingcare-infor">
              <ul className="bookingcare-infor-ul">
                <li>
                  <a href="https://tuyendung.bookingcare.vn/">Tuyển dụng</a>
                </li>
                <li>
                  <a href="https://bookingcare.vn/thong-tin/chinh-sach-bao-mat-p8">
                    Chính sách bảo mật
                  </a>
                </li>
                <li>
                  <a href="https://bookingcare.vn/site/quyche">
                    Quy chế hoạt động
                  </a>
                </li>
                <li>
                  <a href="https://bookingcare.vn/hop-tac-voi-bookingcare">
                    Liên hệ hợp tác
                  </a>
                </li>
                <li>
                  <a href="https://bookingcare.vn/thong-tin/dieu-khoan-su-dung-p7">
                    Điều khoản sử dụng
                  </a>
                </li>
                <li>
                  <a href="https://bookingcare.vn/benh-nhan-thuong-hoi">
                    Câu hỏi thường gặp
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="home-footer-partner">
            <div className="partner-title">Đối tác bổ trợ nội dung</div>
            <div className="content-1">
              <img src={images_1} className="image" />

              <div className="infor">
                <span className="title-name">Hello Doctor</span>
                <span className="title-content">
                  Bảo trợ chuyên mục nội dung "sức khỏe tinh thần"
                </span>
              </div>
            </div>

            <div className="content-1">
              <img src={images_2} className="image" />
              <div className="infor">
                <span className="title-name">
                  Hệ thống y khoa chuyên sâu quốc tế Bernard
                </span>
                <span className="title-content">
                  Bảo trợ chuyên mục nội dung "y khoa chuyên sâu"
                </span>
              </div>
            </div>
            <div className="content-1">
              <img src={images_3} alt="image-1" className="image" />
              <div className="infor">
                <span className="title-name">
                  Doctor Check - Tầm Soát Bệnh Để Sống Thọ Hơn
                </span>
                <span className="title-content">
                  Bảo trợ chyên mục nội dung "sức khỏe tổng quát"
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="app">
          <div className="app-content">
            <i className="fas fa-mobile"></i>
            <span>
              Tải ứng dụng BookingCare cho điện thoại hoặc máy tính bảng:
              <a href="https://bookingcare.vn/app">Android</a> -{" "}
              <a href="https://bookingcare.vn/app">iPhone/iPad</a> -{" "}
              <a href="https://bookingcare.vn/app">Khác</a>
            </span>
          </div>
        </div>
        <div className="link">
          <span>&copy; 2024 BookingCare.</span>
          <div className="icon">
            <i className="fab fa-facebook-square facebook"></i>
            <i className="fab fa-youtube-square youtube"></i>
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
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeFooter)
);
