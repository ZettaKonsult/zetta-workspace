import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllReports } from '../../reducers'
import './Mypage.css'

const ReportList = ({ reports }) => (
  <div className="Mypage">
    <button>Create new report</button>
    <ul className="ReportList">
      {reports.map(report => <ReportItem key={report.id} report={report} />)}
    </ul>
  </div>
)

const ReportItem = ({ report }) => (
  <li className="ReportItem">
    <a className="ReportLink" href="#">
      Report date: {new Date(report.date).toDateString()}
    </a>
  </li>
)

const mapStateToProps = (state, props) => ({
  reports: getAllReports(state)
})

const Mypage = connect(mapStateToProps)(ReportList)

export default Mypage
