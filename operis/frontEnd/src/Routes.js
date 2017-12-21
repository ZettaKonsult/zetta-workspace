import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ReportForm from './Container/Report/Report'
import Mypage from './Container/Mypage/Mypage'
import Place from './Container/Place/Place'
import Worker from './Container/Worker/Worker'
import AdminDashboard from './Container/AdminDashboard/AdminDashboard'
import PageNotFound from './Container/PageNotFound/PageNotFound'
import Login from './Container/Login/Login'

export default () => (
  <Switch>
    <Route path="/" exact component={Mypage} />
    <Route path="/report/:id?" exact component={ReportForm} />
    <Route path="/worker/:id?" exact component={Worker} />
    <Route path="/place/:id?" exact component={Place} />
    <Route path="/admin" exact component={AdminDashboard} />
    <Route path="/Login" exact component={Login} />
    <Route component={PageNotFound} />
  </Switch>
)
