import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ReportForm from './Container/Report/Report'
import Mypage from './Container/Mypage/Mypage'
import AdminDashboard from './Container/AdminDashboard/AdminDashboard'
import PageNotFound from './Container/PageNotFound/PageNotFound'

export default () => (
  <Switch>
    <Route path="/" exact component={Mypage} />
    <Route path="/report/:id?" exact component={ReportForm} />
    <Route path="/admin" exact component={AdminDashboard} />
    <Route component={PageNotFound} />
  </Switch>
)
