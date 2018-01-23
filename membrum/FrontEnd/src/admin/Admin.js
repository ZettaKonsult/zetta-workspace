import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Line } from 'react-chartjs-2'

import AdminActionMenu from './AdminActionMenu'
import AdminCardPanel from './AdminCardPanel'
import MemberFind from './MemberFind'

import FadedLine from '../components/FadedLine'

import mock from '../mocks/statisticsMock'

import './style.css'
import './AdminActionMenu.css'

const Dashboard = ({ match }) => (
  <div className="AdminDashboardLayout">
    <AdminCardPanel />
    <div className="AdminStatistic">
      <Line data={mock()} />
    </div>
  </div>
)

export default ({ match }) => (
  <div>
    <h1 className="DashboardTitle">Dashboard</h1>
    <FadedLine />
    {console.log(match)}
    <Route exact path={`${match.path}`} component={Dashboard} />
    <Route path={`${match.path}/find`} component={MemberFind} />
    <Route path={`${match.path}`} component={AdminActionMenu} />
  </div>
)
