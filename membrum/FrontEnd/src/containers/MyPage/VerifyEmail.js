import React, { Component } from 'react';

export default class ForgottenPassword extends Component {
  constructor() {
    super();

    this.state = {
      code: '',
    };
  }

  verifyEmail = e => {
    e.preventDefault();
  };

  onChange = e => this.setState({ [e.target.id]: e.target.value });

  render() {
    return (
      <div>
        <button onClick={getAttributeVerificationCode}>Get code</button>
        <label htmlFor="code">Code:</label>
        <input
          id="code"
          type="text"
          value={this.state.code}
          onChange={this.onChange}
        />
        <button onClick={this.verifyEmail}>Verify Email</button>
      </div>
    );
  }
}
