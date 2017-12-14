import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllReports } from '../../reducers'

import { Divider } from 'semantic-ui-react'
import './Mypage.css'

const ReportList = ({ reports }) => (
  <div className="Mypage">
    <Link to="/report">Create new report</Link>
    <Divider />
    <Link to="/Worker">Create new worker</Link>
    <Divider />
    <Link to="/place">Create new workplace</Link>
    <Divider />
    <ul className="ReportList">
      {reports.map(report => <ReportItem key={report.id} report={report} />)}
    </ul>
  </div>
)

const ReportItem = ({ report }) => (
  <li className="ReportItem">
    <Link to={`/report/${report.id}`} className="ReportLink">
      Report date: {new Date(report.date).toDateString()}
    </Link>
  </li>
)

const mapStateToProps = (state, props) => ({
  reports: getAllReports(state)
})

const Mypage = connect(mapStateToProps)(ReportList)

export default Mypage
