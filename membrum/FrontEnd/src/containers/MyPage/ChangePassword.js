import React, { Component } from 'react';

// import { changePassword } from "../../libs/awsPassword"
// import { validateChangePassword } from "../../libs/Validation"

import './changePassword.css';

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
      isSuccess: null,
    };
  }

  onChange = e => this.setState({ [e.target.id]: e.target.value });

  changePassword = async e => {
    e.preventDefault();
    // const {oldPassword, newPassword, newPasswordConfirm} = this.state
    // if (validateChangePassword(oldPassword, newPassword, newPasswordConfirm)) {
    //   await changePassword(oldPassword, newPassword)
    //   this.setState({ isSuccess: true })
    // } else {
    //   this.setState({ isSuccess: false })
    // }
  };

  render() {
    return (
      <div className="changePassword">
        <form>
          <label htmlFor="oldPassword">Old Password</label>
          <input id="oldPassword" onChange={this.onChange} type="text" />
          <label htmlFor="newPassword">New Password</label>
          <input id="newPassword" onChange={this.onChange} type="text" />
          <label htmlFor="newPasswordConfirm">Confim New Password</label>
          <input id="newPasswordConfirm" onChange={this.onChange} type="text" />
          <button onClick={this.changePassword}>Change Password</button>
        </form>
      </div>
    );
  }
}
