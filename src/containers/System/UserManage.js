import React, { Component } from "react";

import { connect } from "react-redux";
import ModalEditUser from "./ModalEditUser";
import "./UserManage.scss";
import {
  getAllUsers,
  ceateNewUserSer,
  deleteUserSer,
  editUserSer,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
  constructor(props) {
    // constructor represent class
    super(props); // props => state father => call API
    // this = UserManage
    this.state = {
      arrUsers: [],
      isOpenModal: false,
      isOpenModalEdit: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersReact();
  }

  getAllUsersReact = async () => {
    // call API users
    let respone = await getAllUsers("ALL");
    if (respone && respone.errCode === 1) {
      this.setState({
        arrUsers: respone.users,
      });
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModal: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  toggleUserEditModal = () => {
    this.setState({
      isOpenModalEdit: !this.state.isOpenModalEdit,
    });
  };

  //   Create Users
  createNewUser = async (data) => {
    try {
      let reponse = await ceateNewUserSer(data);
      if (reponse && reponse.errCode !== 0) {
        alert(reponse.message);
      } else {
        await this.getAllUsersReact();
        this.setState({
          isOpenModal: false,
        });
        // transmit data
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
        // How to transmit data
        // emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  //   Delete users
  handleDeleteUser = async (users) => {
    try {
      let res = await deleteUserSer(users.id);
      if (res && res.errCode === 0) {
        await this.getAllUsersReact();
      } else {
        alert(res.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Update users
  handleEditUser = (user) => {
    this.setState({
      isOpenModalEdit: true,
      userEdit: user,
    });
  };

  doEditUsers = async (user) => {
    try {
      let res = await editUserSer(user);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalEdit: false,
        });

        await this.getAllUsersReact();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModalUser
          isOpenModal={this.state.isOpenModal}
          // truyền pure fuction
          createNewUser={this.createNewUser}
          toggleUserModal={this.toggleUserModal}
        />
        {this.state.isOpenModalEdit && (
          <ModalEditUser
            isOpenModal={this.state.isOpenModalEdit}
            currentEditUser={this.state.userEdit}
            toggleUserModal={this.toggleUserEditModal}
            editUsers={this.doEditUsers}
          />
        )}
        <div className="title text-center">Manage users with Cuong Pham</div>
        <div className="mx-1">
          <button
            className="btn btn-primary rounded-lg text-white px-2"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i> Add new users
          </button>
        </div>
        <div className="users-table mt-4 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn_edit"
                          onClick={() => this.handleEditUser(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn_delete"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

// start rendering the first constructor test component

/** Life cycle
 * Run component:
 * 1. Run constructor => init state
 * 2. Did mount (set state) => use the values tag for one state: mount = born; die = unmount
 * 3. Render. (re-render)
 */

// Passing props to super helps us use this.props in constructor, otherwise, it will become undefined.
