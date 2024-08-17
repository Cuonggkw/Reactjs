import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import { every } from "lodash";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,

      isUserCreated: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phonenumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",

      actions: "",
      userEditId: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRolerStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // render => DidUpdate
    // Present (this) and past (previous)
    // []                 [3]
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGender = this.props.genderRedux;
      this.setState({
        genderArr: arrGender,
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
      });
    }

    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux;
      this.setState({
        positionArr: arrPosition,
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
      });
    }

    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;
      this.setState({
        roleArr: arrRole,
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }

    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGender = this.props.genderRedux;
      let arrPosition = this.props.positionRedux;
      let arrRole = this.props.roleRedux;

      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phonenumber: "",
        address: "",
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
        avatar: "",
        actions: CRUD_ACTIONS.CREATE,
        previewImgURL: "",
      });
    }
  }

  handlOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      // console.log("Base 64 imgae:", base64);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  handleSaveUser = (data) => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let { actions } = this.state;
    if (actions === CRUD_ACTIONS.CREATE) {
      // fire redux create user.
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phonenumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    if (actions === CRUD_ACTIONS.EDIT) {
      // fire redux create user.
      this.props.editAUser({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phonenumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phonenumber",
      "address",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("You need to input on:" + " " + arrCheck[i]);
        break;
      }
    }

    return isValid;
  };

  // handleChange = (event) => {
  //   const input = event.target;
  //   // const start = input.selectionStart;
  //   this.setState({
  //     password: input.value.toUpperCase(),
  //   });
  // };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };

    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "HARDCODE",
      firstName: user.firstName,
      lastName: user.lastName,
      phonenumber: user.phoneNumber,
      address: user.address,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      previewImgURL: imageBase64,
      avatar: "",
      actions: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
  };

  render() {
    const { genderArr, positionArr, roleArr } = this.state;
    let language = this.props.language;
    let isLoadGender = this.props.isLoadingGender;
    let {
      email,
      password,
      firstName,
      lastName,
      phonenumber,
      address,
      gender,
      position,
      role,
      avatar,
    } = this.state;
    // console.log("Phai check render Redux:", this.props.genderRedux);
    return (
      <div className="user-redux-container">
        <div className="title">User Redux hoi dan IT</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="col-12">
                {isLoadGender === true ? "Loading gender" : ""}
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  disabled={
                    this.state.actions === CRUD_ACTIONS.EDIT ? true : false
                  }
                  className="form-control"
                  value={email}
                  onChange={(event) => {
                    this.onChangeInput(event, "email");
                  }}
                />
              </div>

              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  onInput={(e) =>
                    (e.target.value = ("" + e.target.value).toUpperCase())
                  }
                  disabled={
                    this.state.actions === CRUD_ACTIONS.EDIT ? true : false
                  }
                  className="form-control"
                  value={password}
                  onChange={(event) => {
                    this.onChangeInput(event, "password");
                  }}
                />
              </div>

              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.firstName" />
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  className="form-control"
                  value={firstName}
                  onChange={(event) => {
                    this.onChangeInput(event, "firstName");
                  }}
                />
              </div>

              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.lastName" />
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  className="form-control"
                  value={lastName}
                  onChange={(event) => {
                    this.onChangeInput(event, "lastName");
                  }}
                />
              </div>

              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.phoneNumber" />
                </label>
                <input
                  type="text"
                  placeholder="Phone number"
                  className="form-control"
                  value={phonenumber}
                  onChange={(event) => {
                    this.onChangeInput(event, "phonenumber");
                  }}
                />
              </div>

              <div className="col-9">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  className="form-control"
                  value={address}
                  onChange={(event) => {
                    this.onChangeInput(event, "address");
                  }}
                />
              </div>

              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  className="form-select"
                  value={gender}
                  onChange={(event) => {
                    this.onChangeInput(event, "gender");
                  }}
                >
                  {genderArr &&
                    genderArr.length > 0 &&
                    genderArr.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  className="form-select"
                  value={position}
                  onChange={(event) => {
                    this.onChangeInput(event, "position");
                  }}
                >
                  {positionArr &&
                    positionArr.length > 0 &&
                    positionArr.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.roleId" />
                </label>
                <select
                  className="form-select"
                  value={role}
                  onChange={(event) => {
                    this.onChangeInput(event, "role");
                  }}
                >
                  {roleArr &&
                    roleArr.length > 0 &&
                    roleArr.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-img-container">
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    onChange={(event) => this.handlOnchangeImage(event)}
                  />
                  <label className="label-upload" htmlFor="previewImg">
                    Tải ảnh <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-img"
                    style={{
                      backgroundImage: `url(${this.state.previewImgURL}`,
                    }}
                    onClick={() => this.openPreviewImage()}
                  ></div>
                </div>
              </div>

              <div className="col-12 my-3">
                <button
                  className={
                    this.state.actions === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning"
                      : "btn btn-primary"
                  }
                  onClick={() => this.handleSaveUser()}
                >
                  {this.state.actions === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-user.edit" />
                  ) : (
                    <FormattedMessage id="manage-user.save" />
                  )}
                </button>
              </div>

              <div className="col-12 mb-5">
                <TableManageUser
                  handleEditUserFromParent={this.handleEditUserFromParent}
                  actions={this.state.actions}
                />
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language, // language take it over props
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRolerStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    editAUser: (data) => dispatch(actions.editAUser(data)),

    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) =>
    //   dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
