import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Line } from 'react-chartjs-2'

import AdminActionMenu from './AdminActionMenu'
import AdminCardPanel from './AdminCardPanel'
import MemberFind from './MemberFind'

import FadedLine from '../components/FadedLine'

import mock from '../mocks/statisticsMock'

import './style.css'
import './AdminActionMenu.css'

const Dashboard = () => (
  <div className="AdminDashboardLayout">
    <AdminCardPanel />
    <div className="AdminStatistic">
      <Line data={mock()} />
    </div>
    <AdminActionMenu />
  </div>
)

export default ({ match }) => (
  <div>
    <h1 className="DashboardTitle">Dashboard</h1>
    <FadedLine />
    <Route to={`${match.path}`} exact component={Dashboard} />
    <Route to={`${match.path}/find`} component={MemberFind} />
  </div>
)
