import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DetailHandBook.scss";
import { getAllDetailHandBookById } from "../../../services/userService";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/Section/HomeFooter";

import { FormattedMessage } from "react-intl";
import _ from "lodash";
// react-router-dom => is a library

// Hiển thị thông tin doctor
class DetailHandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrHandBook: [],
      dataDetailHandBook: [],
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

      let res = await getAllDetailHandBookById({
        id: id,
      });

      if (res && res.errCode === 0) {
        this.setState({
          dataDetailHandBook: res.data,
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
    let { dataDetailHandBook } = this.state;
    return (
      <div className="detail-handbook-container">
        <HomeHeader />
        <div className="detail-handbook-body">
          <div className="description-handbook">
            {dataDetailHandBook && !_.isEmpty(dataDetailHandBook) && (
              <>
                <div className="content-left">
                  <div
                    className="handbook-img"
                    style={{
                      backgroundImage: `url(${
                        dataDetailHandBook && dataDetailHandBook.image
                          ? dataDetailHandBook.image
                          : ""
                      }`,
                    }}
                  ></div>
                  <div className="handbook-name">{dataDetailHandBook.name}</div>
                  <div
                    className="handbook-html"
                    dangerouslySetInnerHTML={{
                      __html: dataDetailHandBook.descriptionHTML,
                    }}
                  ></div>
                </div>
                <div className="content-right">
                  <div className="main-content">
                    <div className="main">Nội dung chính</div>
                    <div className="border-handbook"></div>
                    <div className="handbook-document">
                      {dataDetailHandBook.document.split("\n").map((i, key) => {
                        return <div key={key}>{i}</div>;
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandBook);
