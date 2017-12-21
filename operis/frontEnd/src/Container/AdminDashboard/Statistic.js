import React from 'react'
import { connect } from 'react-redux'

import { Segment, Statistic } from 'semantic-ui-react'

import * as selectors from '../../reducers'

const list = props => (
  <div>
    <Segment inverted>
      <Statistic.Group inverted size="small">
        <StatisticRow label="Hours" value={props.sumReports.hours} />

        <StatisticRow label="Extra" value={props.sumReports.extrahours} />

        <StatisticRow
          label="Total"
          value={props.sumReports.hours + props.sumReports.extrahours}
        />
      </Statistic.Group>
    </Segment>
    {props.reports.map(report => (
      <ReportCard
        key={report.id}
        worker={props.getWorkerName(report.worker)}
        hours={report.hours}
        extra={report.extrahours}
        date={new Date(report.date).toISOString().split('T')[0]}
        workplace={report.place}
      />
    ))}
  </div>
)

const ReportCard = ({ date, hours, extra, worker, workplace }) => (
  <div
    style={{
      padding: '0.5em',
      border: '1px solid grey',
      margin: '0.2em',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '5px'
    }}>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <h3>{date}</h3>
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
        <h3 style={{ margin: 0 }}>{worker}</h3>
        <em>workplace</em>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{}}>Hours: {hours}</span>
        <span>Extra: {extra}</span>
      </div>
    </div>
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
    props.filterMonth,
    props.filterWorker
  )
  return {
    reports,
    sumReports: selectors.sumWorkedHours(reports),
    getWorkerName: selectors.getWorkerName(state)
  }
}

export default connect(mapStateToProps)(list)
