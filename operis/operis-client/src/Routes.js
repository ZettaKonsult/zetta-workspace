import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Recipient from './Recipients/Recipient';
import Invoice from './Invoice/Invoice';
import Home from './Container/Home/Home';
import PageNotFound from './Container/PageNotFound/PageNotFound';

export default props => (
  <Switch>
    <Route path="/" exact render={route => <Home {...props} {...route} />} />

    <Route
      path="/recipient"
      render={route => <Recipient {...props} {...route} />}
    />

    <Route
      path="/invoice"
      render={route => <Invoice {...props} {...route} />}
    />

    <Route component={PageNotFound} />
  </Switch>
);
