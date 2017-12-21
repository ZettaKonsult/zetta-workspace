import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import * as selectors from '../../reducers'
import {Dropdown} from 'semantic-ui-react'
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
        <Dropdown
          style={{fontSize: '1.2em', margin: '0.5em 0'}}
          value={this.state.month}
          placeholder="Filter on month"
          onChange={(e, {value}) => this.onSelectChange('month', value)}
          options={this.props.months.map((monthEpoch, index) => ({
            text: new Date(Number(monthEpoch)).toISOString().split('T')[0],
            key: monthEpoch,
            value: monthEpoch
          }))}
          fluid
          search
          selection
        />
        <Dropdown
          style={{fontSize: '1.2em', margin: '0.5em 0'}}
          value={this.state.worker}
          placeholder="Filter on worker"
          onChange={(e, {value}) => this.onSelectChange('worker', value)}
          options={this.props.workers.map(worker => ({
            key: worker.id,
            text: worker.name,
            value: worker.id
          }))}
          fluid
          search
          selection
        />
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

const updateSelectedValue = (key, value) => (state, props) => ({[key]: value})

const mapStateToProps = (state, props) => ({
  workers: selectors.getWorkers(state),
  months: selectors.getAllMonthReported(state)
})

export default connect(mapStateToProps)(AdminDashboard)
