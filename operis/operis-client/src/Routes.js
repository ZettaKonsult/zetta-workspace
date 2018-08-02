import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Recipient from './Recipients/Recipient';
import Home from './Container/Home/Home';
import PageNotFound from './Container/PageNotFound/PageNotFound';

export default props => (
  <Switch>
    <Route path="/" exact render={test => <Home {...props} {...test} />} />

    <Route
      path="/recipient"
      render={test => <Recipient {...props} {...test} />}
    />

    <Route component={PageNotFound} />
  </Switch>
);
