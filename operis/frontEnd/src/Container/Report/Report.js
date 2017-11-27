import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import ReportForm from '../../Reports/Form/ReportForm'
import './Report.css'

class Report extends Component {
  render() {
    return (
      <div>
        <ReportForm id={this.props.match.params.id} />
        <Link to="/">Cancel report</Link>
      </div>
    )
  }
}

export default Report
