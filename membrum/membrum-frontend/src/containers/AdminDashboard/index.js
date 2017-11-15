import React, { Component } from "react"

import Card from "../../components/Card"
import FadedLine from "../../components/FadedLine"
import NavLink from "../../components/NavLink"

import { Line } from "react-chartjs-2"
import mock from "../../mocks/statisticsMock"

import "./style.css"

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
          <Card label="New Members" value="700" />

          <Card
            type="success"
            icon="shopping-cart"
            label="Registered Payments"
            value="500"
          />

          <Card
            type="warning"
            icon="tasks"
            label="Things that need approval"
            value="2"
          />

          <Card
            type="danger"
            icon="support"
            label="Flagged Members"
            value="12"
            link="/events"
          />

          <div className="AdminStatistic">
            <Line data={mock()} />
          </div>

          <div className="AdminActionsMenu">
            <div className="AdminActionsHeader">
              <i className="AdminActionIcon fa fa-tasks" />Actions
            </div>

            <NavLink label="Find Member" className="AdminAction" />
            <NavLink
              to="/signup"
              label="Create New Member"
              className="AdminAction"
            />
            <NavLink
              to="/statistics"
              label="Check Statistics"
              className="AdminAction"
            />
            <NavLink
              label="Create/Edit Plans"
              to="/plans"
              className="AdminAction"
            />
            <NavLink
              to="/uploadmembers"
              className="AdminAction"
              label="Upload Ladok List"
            />
            <NavLink className="AdminAction" label="It's Some Kinds Of Magic" />
          </div>
        </div>
      </div>
    )
  }
}
