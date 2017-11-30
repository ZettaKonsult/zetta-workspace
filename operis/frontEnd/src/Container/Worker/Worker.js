import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import WorkerForm from '../../Workers/Form/WorkerForm'
import './Worker.css'

class Worker extends Component {
  render() {
    return (
      <div>
        <WorkerForm id={this.props.match.params.id} />
        <Link to="/">Cancel</Link>
      </div>
    )
  }
}

export default Worker
