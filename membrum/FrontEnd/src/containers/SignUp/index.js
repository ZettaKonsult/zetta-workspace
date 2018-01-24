import React, { Component } from 'react';

import SignupForm from './SignupForm';
import ConfirmationForm from './ConfirmationForm';
import * as is from './Validation';
import './style.css';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ssn: '',
      email: '',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
    };
  }

  validateForm = () =>
    is.email(this.state.email) &&
    is.password(this.state.password) &&
    is.confirmPassword(this.state.password, this.state.confirmPassword);

  validateConfirmationForm = () =>
    is.confirmationCode(this.state.confirmPassword);

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="Signup">
        <SignupForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />

        <ConfirmationForm
          handleSubmit={this.handleConfirmationSubmit}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}
