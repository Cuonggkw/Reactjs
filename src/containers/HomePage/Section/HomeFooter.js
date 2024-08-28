import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./HomeFooter.scss";

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <div className="home-footer-container">
          <div className="address-infor">
            <div className="address-title-hn">
              <div className="address-title">
                Công ty Cổ phần Công nghệ BookingCare
              </div>
              <div>
                <span>
                  Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận
                  Cầu Giấy, Thành phố Hà Nội, Việt Nam
                </span>
              </div>
              <div>
                <i className="fas fa-map-marker-alt"></i>
                <span>
                  ĐKKD số. 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
                </span>
              </div>
              <div>
                <i class="fas fa-mobile-alt"></i>
                <span>024-7301-2468 (7h - 18h)</span>
              </div>
              <div>
                <i className="far fa-envelope"></i>
                <span>support@bookingcare.vn (7h - 18h)</span>
              </div>
            </div>
            <div className="address-title-hn">
              <div className="address-title">Văn phòng tại TP Hồ Chí Minh</div>
              <div>
                <span>
                  Tòa nhà H3, 384 Hoàng Diệu, Phường 6, Quận 4, TP.HCM
                </span>
              </div>
            </div>
          </div>
          <div className="bookingcare">hello</div>
          <div className="home-footer-partner">hello</div>
        </div>
        <p>
          &copy; 2024 Phạm Quốc Cường. More Information,
          <a
            target="_blank"
            href="https://web.facebook.com/profile.php?id=100011258555032"
          >
            Click here
          </a>
        </p>
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
export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
