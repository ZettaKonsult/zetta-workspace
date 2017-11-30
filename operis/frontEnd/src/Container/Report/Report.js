import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import ReportForm from '../../Reports/Form/ReportForm'
import './Report.css'

class Report extends Component {
  callback = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <ReportForm callback={this.callback} id={this.props.match.params.id} />
        <Link to="/">Cancel report</Link>
      </div>
    )
  }
}

export default withRouter(Report)
