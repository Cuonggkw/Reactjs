import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ManageHandBook.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { createNewHandBook } from "../../../services/userService";
import { toast } from "react-toastify";
import { CommonUtils } from "../../../utils";

import { FormattedMessage } from "react-intl";

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Hiển thị thông tin doctor
class ManageHandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      document: "",
    };
  }

  // run 1 duy nhất
  async componentDidMount() {}

  // Chạy lại nhiều lần.
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleSaveNewHandBook = async () => {
    let res = await createNewHandBook(this.state);
    if (res && res.errCode === 0) {
      toast.success("Add new hand book success!");
      this.setState({
        name: "",
        imageBase64: "",
        document: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Something wrongs...");
    }
  };

  handleOnChangInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handlOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      // let objectUrl = URL.createObjectURL(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };

  render() {
    return (
      <div className="manage-handbook-container">
        <div className="handbook-title">Quản lý cẩm nang</div>
        <div className="all-new-handbook">
          <div className="col-5 form-group">
            <label>Tên cẩm nang</label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={(event) => this.handleOnChangInput(event, "name")}
            />
          </div>
          <div className="col-5 mb-4 form-group">
            <label>Ảnh cẩm nang</label>
            <input
              type="file"
              className="form-control"
              onChange={(event) => this.handlOnchangeImage(event)}
            />
          </div>
          <div className="col-5 form-group mb-4">
            <label>Nội dung</label>
            <textarea
              className="form-control"
              rows="4"
              value={this.state.document}
              onChange={(event) => this.handleOnChangInput(event, "document")}
            ></textarea>
          </div>
        </div>
        <div className="col-12">
          <MdEditor
            style={{ height: "400px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.descriptionMarkdown}
          />
        </div>
        <div className="col-12">
          <button
            className="btn-save"
            onClick={() => this.handleSaveNewHandBook()}
          >
            Save
          </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandBook);
