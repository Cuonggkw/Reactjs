import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllHandBook } from "../../../services/userService";
import { withRouter } from "react-router";
import "./HandBook.scss";

class HandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHandBook: [],
    };
  }

  async componentDidMount() {
    let res = await getAllHandBook();
    if (res && res.errCode === 0) {
      this.setState({
        dataHandBook: res.data ? res.data : [],
      });
    }
    // console.log("Check res hand book:", res);
  }

  handleViewDetailHandBook = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-handbook/${item.id}`);
    }
  };
  render() {
    let { dataHandBook } = this.state;
    return (
      <div className="section-share section-handbooks">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cẩm nang</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataHandBook &&
                dataHandBook.length > 0 &&
                dataHandBook.map((item, index) => {
                  return (
                    <div
                      className="handbook-customize"
                      key={index}
                      onClick={() => this.handleViewDetailHandBook(item)}
                    >
                      <div
                        className="bg-image section-handbook"
                        style={{
                          backgroundImage: `url(${item.image}`,
                        }}
                      ></div>
                      <div className="handbook-title">{item.name}</div>
                    </div>
                  );
                })}
            </Slider>
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
  connect(mapStateToProps, mapDispatchToProps)(HandBook)
);
