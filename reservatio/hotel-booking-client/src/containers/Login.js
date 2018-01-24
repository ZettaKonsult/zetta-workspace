import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from 'amazon-cognito-identity-js';
import './Login.css';
import config from '../config.js';
import { withRouter } from 'react-router-dom';
import AWS from 'aws-sdk';
import { Account, setIdentity } from '../libs/zk-aws-users';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      username: '',
      password: '',
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const userToken = await this.login(
        this.state.username,
        this.state.password
      );
      this.props.updateUserToken(userToken);
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  };

  async login(username, password) {
    await setIdentity(
      '460056602695',
      'eu-central-1:31bcf943-5ab2-414c-9b38-0de8939c4392',
      'arn:aws:iam::460056602695:role/Cognito_hotelbookingidentitypoolUnauth_Role'
    );

    try {
      return await Account.loginUser(
        { customer: 'ahusResort', project: 'reservatio' },
        username,
        password
      );
    } catch (exception) {
      console.error(exception);
      throw exception;
    }
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
