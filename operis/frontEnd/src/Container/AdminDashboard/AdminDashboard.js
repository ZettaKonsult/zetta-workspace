import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import * as selectors from '../../reducers'

import List from './Statistic'
import './AdminDashboard.css'

class AdminDashboard extends Component {
  constructor() {
    super()

    this.state = {
      month: '',
      worker: ''
    }
  }
  onSelectChange = (name, value) => {
    this.setState(updateSelectedValue(name, value))
  }
  render() {
    return (
      <div className="AdminDashboard">
        <select
          style={{ fontSize: '1.5em', margin: '0.5em' }}
          value={this.state.month}
          onChange={e => this.onSelectChange('month', e.target.value)}>
          <option value="" />
          {this.props.months.map((monthEpoch, index) => (
            <option key={index} value={monthEpoch}>
              {new Date(Number(monthEpoch)).toISOString().split('T')[0]}
            </option>
          ))}
        </select>
        <select
          style={{ fontSize: '1.5em', margin: '0.5em' }}
          value={this.state.worker}
          onChange={e => this.onSelectChange('worker', e.target.value)}>
          <option value="" />
          {this.props.workers.map(worker => (
            <option key={worker.id} value={worker.id}>
              {worker.name}
            </option>
          ))}
        </select>
        <List filterWorker={this.state.worker} filterMonth={this.state.month} />
        <br />
        <br />
        <br />
        <br />
        <Link to="/">Back</Link>
      </div>
    )
  }
}

const updateSelectedValue = (key, value) => (state, props) => ({ [key]: value })

const mapStateToProps = (state, props) => ({
  workers: selectors.getWorkers(state),
  months: selectors.getAllMonthReported(state)
})

export default connect(mapStateToProps)(AdminDashboard)
