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
      month: 'jan',
      worker: 'Worker1'
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
          <option value="0">Januari</option>
          <option value="1">Februari</option>
          <option value="2">Mars</option>
          <option value="3">April</option>
          <option value="4">may</option>
          <option value="5">jun</option>
          <option value="6">jul</option>
          <option value="7">aug</option>
          <option value="8">sep</option>
          <option value="9">oct</option>
          <option value="10">nov</option>
          <option value="11">dec</option>
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
  workers: selectors.getWorkers(state)
})

export default connect(mapStateToProps)(AdminDashboard)
