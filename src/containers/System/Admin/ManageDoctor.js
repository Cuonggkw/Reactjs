import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDetailInforDoctor } from "../../../services/userService";
import { selectFilter } from "react-bootstrap-table2-filter";

const mdParser = new MarkdownIt(/* Markdown-it options */);

// CREATE INFORMATION DOCTOR

class ManageDoctor extends Component {
  constructor(props) {
    // constructor represent class
    super(props); // props => state father => call API
    this.state = {
      // Save to Markdown table.
      addcontentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctor: [],
      hasOlddata: false,

      // Save to doctor_infor table.
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getRequiredDoctorInfor();
  }

  buildDataInputSelect = (data, type) => {
    let result = [];
    let { language } = this.props;
    if (data && data.length > 0) {
      if (type === "USERS") {
        data.map((item, index) => {
          let object = {};
          let labelVi = `${item.firstName} ${item.lastName}`;
          let labelEn = `${item.lastName} ${item.firstName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        data.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi} vnd`;
          let labelEn = `${item.valueEn} usd`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        data.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
    }
    return result;
  };

  componentDidUpdate(prevProps, prevSate, snapshot) {
    if (prevProps.allDoctor !== this.props.allDoctor) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor, "USERS");
      this.setState({
        listDoctor: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor, "USERS");

      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listDoctor: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  // Finish!
  handleEditorChange = ({ html, text }) => {
    this.setState({
      addcontentMarkdown: text,
      contentHTML: html,
    });
  };

  handleonChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleSaveContentMarkdown = () => {
    let { hasOlddata } = this.state;
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      addcontentMarkdown: this.state.addcontentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOlddata === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });

    let res = await getDetailInforDoctor(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        addcontentMarkdown: markdown.addcontentMarkdown,
        description: markdown.description,
        hasOlddata: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        addcontentMarkdown: "",
        description: "",
        hasOlddata: false,
      });
    }
  };

  handleChangeSelectDoctorInfor = async (selectedOption, listname) => {
    let stateName = listname.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };

  render() {
    let { hasOlddata } = this.state;
    // console.log("Hoi dan it check: ", this.state);
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="admin-doctor.manage-doctor.title-doctor" />
        </div>
        <div className="more-infor">
          <div className="content-left form-group">
            <label>
              <FormattedMessage id="admin-doctor.manage-doctor.chosse-doctor" />
            </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctor}
              placeholder={
                <FormattedMessage id="admin-doctor.manage-doctor.chosse-doctor" />
              }
            />
          </div>
          <div className="content-right">
            <label>
              <FormattedMessage id="admin-doctor.manage-doctor.intro" />
            </label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(event) =>
                this.handleonChangeText(event, "description")
              }
              value={this.state.description}
            ></textarea>
          </div>
        </div>

        {/* // Save to doctor_infor table. */}
        <div className="more-infor-extra row">
          <div className="col-3 form-group">
            <label>
              <FormattedMessage id="admin-doctor.manage-doctor.price" />
            </label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPrice}
              name="selectedPrice"
              placeholder={
                <FormattedMessage id="admin-doctor.manage-doctor.prices" />
              }
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin-doctor.manage-doctor.payment" />
            </label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPayment}
              name="selectedPayment"
              placeholder={
                <FormattedMessage id="admin-doctor.manage-doctor.payments" />
              }
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin-doctor.manage-doctor.province" />
            </label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listProvince}
              name="selectedProvince"
              placeholder={
                <FormattedMessage id="admin-doctor.manage-doctor.provinces" />
              }
            />
          </div>

          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin-doctor.manage-doctor.nameClinic" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleonChangeText(event, "nameClinic")}
              value={this.state.nameClinic}
            ></input>
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin-doctor.manage-doctor.addressClinic" />
            </label>
            <input
              className="form-control"
              onChange={(event) =>
                this.handleonChangeText(event, "addressClinic")
              }
              value={this.state.addressClinic}
            ></input>
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin-doctor.manage-doctor.note" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleonChangeText(event, "note")}
              value={this.state.note}
            ></input>
          </div>
        </div>

        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.addcontentMarkdown}
          />
        </div>
        <button
          className={
            hasOlddata === true ? "btn-save-doctor" : "create-content-doctor"
          }
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {hasOlddata === true ? (
            <span>
              <FormattedMessage id="admin-doctor.manage-doctor.save-infor" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="admin-doctor.manage-doctor.add-infor" />
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // admin take in rootReducer
    allDoctor: state.admin.allDoctor,
    language: state.app.language,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
