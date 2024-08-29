import React, { Component } from "react";
// library help connect between redux vs react.
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-haeder">Truyên thông nói về IT</div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="350"
              src="https://www.youtube.com/embed/HA4__SCKOMM"
              title="Ung thư phát triển trong cơ thể như thế nào?| BS Phan Trúc, BV Vinmec Times City"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
            {/* <img
              src={require("../../../assets/Footer/064252-doctor-check-2.png")}
            /> */}
            <p>
              Sự sống của loài người bắt đầu từ một tế bào. Hàng nghìn tế bào sẽ
              tạo thành các mô và cơ quan. Mỗi tế bào bao bọc nhân chứa bộ máy
              di truyền bao gồm các nhiễm sắc thể chứa hàng vạn gen chỉ dẫn sự
              phát triển, hoạt động và phân chia và giúp cơ thể bạn khỏe mạnh và
              lớn dần. Nhưng sự nhân bản của tế bào giống như một điệu nhảy phức
              tạp. Khi một DNA bị tổn Thương, phân chia tế bào có thể bị lệch
              khỏi quỹ đạo. Lúc này đột biến xuất hiện và phần lớn sẽ được hệ
              thống sữa chữa của chính bản thân khắc phục. Nhưng khi tích lũy đủ
              số lượng, chúng sẽ chiếm quyền điều khiển, làm tế bào phân chia
              ngoài tầm kiểm soát. Chặng đường cho các tế bào ung thư đã được
              dọn sẵn.
            </p>
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
export default connect(mapStateToProps, mapDispatchToProps)(About);
