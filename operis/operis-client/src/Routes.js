import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Recipient from './Recipients/Recipient';
import Invoice from './Invoice/Invoice';
import CompanyCustomer from './CompanyCustomer/CompanyCustomer';
import Home from './Container/Home/Home';
import PageNotFound from './Container/PageNotFound/PageNotFound';

export default props => (
  <Switch>
    <Route path="/" exact component={Home} />

    <Route path="/recipient" component={Recipient} />

    <Route path="/invoice" component={Invoice} />

    <Route path="/register" component={CompanyCustomer} />
    <Route component={PageNotFound} />
  </Switch>
);
