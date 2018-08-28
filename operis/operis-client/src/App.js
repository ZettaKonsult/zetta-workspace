import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Divider } from 'semantic-ui-react';

import ErrorBoundary from './Components/error';
import AuthHandler from './authHandler';
import Recipient from './Recipients/Recipient';
import Login from './Container/Login';
import Invoice from './Invoice/Invoice';
import Profile from './Profile/Profile';
import Home from './Container/Home/Home';
import PageNotFound from './Container/PageNotFound/PageNotFound';
import PageNav from './Components/Nav/PageNav';

class App extends Component {
  componentDidMount() {}

  render() {
    const { currentUser } = this.props;

    return (
      <ErrorBoundary>
        <Route component={AuthHandler} props={{ currentUser }} />
        <Route component={PageNav} />
        <Divider />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
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
