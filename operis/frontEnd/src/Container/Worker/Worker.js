import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import WorkerForm from '../../Workers/Form/WorkerForm'
import './Worker.css'

class Worker extends Component {
  callback = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <WorkerForm callback={this.callback} id={this.props.match.params.id} />
        <Link to="/">Cancel</Link>
      </div>
    )
  }
}

export default withRouter(Worker)
