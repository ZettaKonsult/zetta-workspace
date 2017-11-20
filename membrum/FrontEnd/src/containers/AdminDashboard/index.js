import React, { Component } from "react"

import AdminActionMenu from "./AdminActionMenu"
import AdminCardPanel from "./AdminCardPanel"

import FadedLine from "../../components/FadedLine"

import { Line } from "react-chartjs-2"
import mock from "../../mocks/statisticsMock"

import "./style.css"
import "./AdminActionMenu.css"

export default class AdminDashborad extends Component {
  constructor(props) {
    super(props)

    this.state = {
      payments: 0
    }
  }

  render() {
    return (
      <div>
        <h1 className="DashboardTitle">Dashboard</h1>
        <FadedLine />
        <div className="AdminDashboardLayout">
          <AdminCardPanel />
          <div className="AdminStatistic">
            <Line data={mock()} />
          </div>
          <AdminActionMenu />
        </div>
      </div>
    )
  }
}
