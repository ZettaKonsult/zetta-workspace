import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ReportForm from './Container/Report/Report'
import Mypage from './Container/Mypage/Mypage'
import AdminDashboard from './Container/AdminDashboard/AdminDashboard'

export default () => (
  <Switch>
    <Route path="/" exact component={Mypage} />
    <Route path="/report" exact component={ReportForm} />
    <Route path="/admin" exact component={AdminDashboard} />
  </Switch>
)
