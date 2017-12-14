import React from 'react'
import { connect } from 'react-redux'

import { Segment, Statistic } from 'semantic-ui-react'

import * as selectors from '../../reducers'

const list = props => (
  <div>
    <Segment inverted>
      <Statistic.Group inverted size="small">
        <StatisticRow label="Hours" value={props.sumReports.hours} />

        <StatisticRow label="Extra Hours" value={props.sumReports.extrahours} />

        <StatisticRow
          label="Total"
          value={props.sumReports.hours + props.sumReports.extrahours}
        />
      </Statistic.Group>
    </Segment>
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

const StatisticRow = ({ label, value }) => (
  <Statistic>
    <Statistic.Label>{label}</Statistic.Label>
    <Statistic.Value>{value}</Statistic.Value>
  </Statistic>
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
