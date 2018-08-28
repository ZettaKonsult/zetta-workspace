import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Divider } from 'semantic-ui-react';

import ErrorBoundary from './Components/error';
import AuthHandler from './authHandler';
import Recipient from './Recipients/Recipient';
import Login from './Container/Login';
import Logout from './Container/Logout';
import Invoice from './Invoice/Invoice';
import Profile from './Profile/Profile';
import Home from './Container/Home/Home';
import PageNotFound from './Container/PageNotFound/PageNotFound';
import PageNav from './Components/Nav/PageNav';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Route component={AuthHandler} />
        <Route component={PageNav} />
        <Divider />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/recipient" component={Recipient} />
          <Route path="/invoice" component={Invoice} />
          <Route path="/profile" component={Profile} />
          <Route component={PageNotFound} />
        </Switch>
      </ErrorBoundary>
    );
  }
}

export default App;
