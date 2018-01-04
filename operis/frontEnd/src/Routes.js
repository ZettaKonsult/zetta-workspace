import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Report from './Reports/Report'
import Place from './Places/Place'
import Worker from './Workers/Worker'
import Home from './Container/Home/Home'
import AdminDashboard from './Container/AdminDashboard/AdminDashboard'
import PageNotFound from './Container/PageNotFound/PageNotFound'
import Login from './Container/Login/Login'

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/report/:id?" exact component={Report} />
    <Route path="/worker/:id?" exact component={Worker} />
    <Route path="/place/:id?" exact component={Place} />
    <Route path="/admin" exact component={AdminDashboard} />
    <Route path="/Login" exact component={Login} />
    <Route component={PageNotFound} />
  </Switch>
)
