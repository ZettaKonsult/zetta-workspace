import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Report from './Reports/Report';
import Recipient from './Places/Recipient';
import Worker from './Workers/Worker';
import Home from './Container/Home/Home';
import AdminDashboard from './Container/AdminDashboard/AdminDashboard';
import PageNotFound from './Container/PageNotFound/PageNotFound';
import Invoice from './Invoice/Invoice';

export default props => (
  <Switch>
    <Route path="/" exact render={test => <Home {...props} {...test} />} />
    <Route path="/report" render={test => <Report {...props} {...test} />} />
    <Route path="/worker/:id?" component={Worker} />
    <Route
      path="/recipient"
      render={test => <Recipient {...props} {...test} />}
    />
    <Route path="/admin" component={AdminDashboard} />
    <Route path="/invoice" component={Invoice} />
    <Route component={PageNotFound} />
  </Switch>
);
