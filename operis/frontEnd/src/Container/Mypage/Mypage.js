import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAllReports, getWorkerName} from '../../reducers'

import {Divider} from 'semantic-ui-react'
import './Mypage.css'

import ReportCard from '../../Components/ReportCard/ReportCard'

const ReportList = props => (
  <div className="Mypage">
    <Link to="/report">Create new report</Link>
    <Divider />
    <Link to="/Worker">Create new worker</Link>
    <Divider />
    <Link to="/place">Create new workplace</Link>
    <Divider />
    <ul className="ReportList">
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
    </ul>
  </div>
)

const mapStateToProps = (state, props) => ({
  reports: getAllReports(state),
  getWorkerName: getWorkerName(state)
})

const Mypage = connect(mapStateToProps)(ReportList)

export default Mypage
