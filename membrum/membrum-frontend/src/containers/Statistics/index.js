import React, { Component } from 'react'

import VisibilityChange from '../../components/VisibilityChange'

import StatisticsView from './Statistics'
import Menu from './Menu'
import mock from './mock'

import './style.css'

class Statistics extends Component {
  constructor(props) {
    super(props)
    this.filters = ['all', 'mail', 'members', 'payment']
    this.updateInterval = 2000

    this.state = {
      isLoading: true,
      filter: 'all',
      intervalId: false
    }
  }

  async componentDidMount() {
    this.updateChart()
    this.setState(createInterval(this.updateChart, this.updateInterval))
    this.setState({ isLoading: false })
  }

  componentDidUpdate() {
    if (this.props.visible && !this.state.intervalId) {
      this.setState(createInterval(this.updateChart, this.updateInterval))
    } else if (!this.props.visible && this.state.intervalId) {
      this.setState(removeInterval)
    }
  }

  componentWillUnmount() {
    removeInterval(this.state)
  }

  setFilter = e => this.setState({ filter: e.target.id })

  updateChart = () => this.setState(featchChartData())

  render() {
    const { filter } = this.state
    return (
      <div>
        <Menu
          click={e => this.setFilter(e)}
          filters={this.filters}
          selected={filter}
        />
        {!this.state.isLoading && (
          <StatisticsView filter={this.state.filter} data={this.state} />
        )}
      </div>
    )
  }
}

export default VisibilityChange(Statistics)

function createInterval(func, interval) {
  return function create(state, props) {
    return {
      intervalId: setInterval(func, interval)
    }
  }
}

function removeInterval(state, props) {
  clearInterval(state.intervalId)
  return {
    intervalId: false
  }
}

function featchChartData() {
  return {
    mail: [mock()],
    members: [mock(), mock()],
    payment: [mock(), mock(), mock()]
  }
}
