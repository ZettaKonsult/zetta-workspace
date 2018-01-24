import AWS from 'aws-sdk';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Nav, NavItem, Navbar } from 'react-bootstrap';

import database from './database';

import Routes from './Routes';
import RouteNavItem from './components/RouteNavItem';
import config from './config.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: null,
      isLoadingUserToken: true,
    };
  }

  async componentDidMount() {
    const currentUser = this.getCurrentUser();

    if (currentUser === null) {
      this.setState({ isLoadingUserToken: false });
      return;
    }

    try {
      const userToken = await this.getUserToken(currentUser);
      this.updateUserToken(userToken);
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoadingUserToken: false });
  }

  updateUserToken = userToken => {
    this.setState({
      userToken: userToken,
    });
  };

  handleNavLink = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute('href'));
  };

  handleLogout = event => {
    const currentUser = this.getCurrentUser();

    if (currentUser !== null) {
      currentUser.signOut();
    }

    if (AWS.config.credentials) {
      AWS.config.credentials.clearCachedId();
    }

    this.updateUserToken(null);

    this.props.history.push('/login');
  };

  getCurrentUser() {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID,
    });
    return userPool.getCurrentUser();
  }

  getUserToken(currentUser) {
    return new Promise((resolve, reject) => {
      currentUser.getSession(function(err, session) {
        if (err) {
          reject(err);
          return;
        }
        resolve(session.getIdToken().getJwtToken());
      });
    });
  }

  render() {
    const childProps = {
      userToken: this.state.userToken,
      updateUserToken: this.updateUserToken,
      database: database(this.state.userToken),
    };

    return (
      !this.state.isLoadingUserToken && (
        <div className="App container">
          <Navbar fluid collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Reservatio</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                {this.state.userToken
                  ? [
                      <RouteNavItem
                        key={1}
                        onClick={this.handleNavLink}
                        href="/bookings"
                      >
                        Bookings
                      </RouteNavItem>,
                      <RouteNavItem
                        key={2}
                        style={{ padding: '0 1em' }}
                        onClick={this.handleNavLink}
                        href="/overview"
                      >
                        Overview
                      </RouteNavItem>,
                      <NavItem key={3} onClick={this.handleLogout}>
                        Logout
                      </NavItem>,
                    ]
                  : [
                      <RouteNavItem
                        key={2}
                        onClick={this.handleNavLink}
                        href="/login"
                      >
                        Login
                      </RouteNavItem>,
                    ]}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Routes childProps={childProps} />
        </div>
      )
    );
  }
}

export default withRouter(App);

// <RouteNavItem
//   key={1}
//   onClick={this.handleNavLink}
//   href="/signup"
// >
//   Signup
// </RouteNavItem>,
