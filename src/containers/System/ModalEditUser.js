import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// library for handling objects and arr effciently
import _ from "lodash";
class ModalEditUser extends Component {
  constructor(props) {
    // Kết thừa those props từ cha under.
    super(props); // props => Proprties.
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    let users = this.props.currentEditUser; //check {}
    if (users && !_.isEmpty(users)) {
      this.setState({
        id: users.id,
        email: users.email,
        password: "harcode",
        firstName: users.firstName,
        lastName: users.lastName,
        address: users.address,
      });
    }
  }

  toggle = () => {
    // kế thừa bên  lớp cha(UserManage)
    this.props.toggleUserModal();
  };

  handleOnChangeInput = (event, id) => {
    // bad code
    // nature of the object is a array

    /**
     * this.state.email = this.state['email']
     */
    // this.state[id] = event.target.value;
    // this.setState(
    //   {
    //     ...this.state,
    //   },
    // );
    // good code
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValideInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      // console.log("Check inside loop", this.state[arrInput[i]], arrInput[i]);
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter" + " " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveUsers = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      // Call API edit users modal
      this.props.editUsers(this.state);
    }
  };
  render() {
    // son

    return (
      <Modal
        isOpen={this.props.isOpenModal}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-container"}
        size="lg"
        centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Edit a new users
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Email"
                // no fix
                disabled
                onChange={(event) => {
                  this.handleOnChangeInput(event, "email");
                }}
                value={this.state.email}
              />
            </div>

            <div className="input-container">
              <label>Password:</label>
              <input
                type="password"
                placeholder="Password"
                // no fix
                disabled
                onChange={(event) => {
                  this.handleOnChangeInput(event, "password");
                }}
                value={this.state.password}
              />
            </div>

            <div className="input-container">
              <label>First name</label>
              <input
                type="text"
                placeholder="First name"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "firstName");
                }}
                value={this.state.firstName}
              />
            </div>

            <div className="input-container">
              <label>Last name</label>
              <input
                type="text"
                placeholder="Last name"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "lastName");
                }}
                value={this.state.lastName}
              />
            </div>

            <div className="input-container max-width">
              <label>Address</label>
              <input
                type="text"
                placeholder="Address"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "address");
                }}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => {
              this.handleSaveUsers();
            }}
          >
            Save changes
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
