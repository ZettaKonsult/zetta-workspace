import React from 'react'
import { connect } from 'react-redux'

import * as selectors from '../../reducers'

const list = props => (
  <div>
    Summary <br /> Hours: {props.sumReports.hours} <br />
    Extra Hours: {props.sumReports.extrahours} <br />
    Total: {props.sumReports.hours + props.sumReports.extrahours}
    {props.reports.map(report => (
      <div
        style={{ padding: '0.5em', border: '1px solid black', margin: '0.2em' }}
        key={report.id}>
        Date: {new Date(report.date).toISOString().split('T')[0]}
        <br />
        Hours: {report.hours} Extra Hours: {report.extrahours}
        <br />
        Worker: {props.getWorkerName(report.worker)}
      </div>
    ))}
  </div>
)

const mapStateToProps = (state, props) => {
  const reports = selectors.getWorkersMonthlyReport(
    state,
    Date.UTC(2017, props.filterMonth, 2),
    props.filterWorker
  )
  return {
    reports,
    sumReports: selectors.sumWorkedHours(reports),
    getWorkerName: selectors.getWorkerName(state)
  }
}

export default connect(mapStateToProps)(list)
