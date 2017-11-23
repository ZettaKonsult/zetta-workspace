import React, { Component } from 'react';

import ReportStore from '../../Store/ReportStore'

import './Mypage.css'

class Mypage extends Component {
  
  constructor(){
    super()
    
    this.state = {
      reports: []
    }
  }
  
  componentDidMount(){
    this.setState(showReports)
  }
  
  render() {
    return (
      <div className='Mypage'>
        <button>Create new report</button>
        <ul className='ReportList'>
          {this.state.reports.map(report => <ReportItem key={report.id} report={report}></ReportItem>)}
        </ul>
      </div>
    )
  }
}

export default Mypage

const ReportItem = ({report}) => (
  <li className='ReportItem'>
    <a className='ReportLink' href="#">
      Report date: {(new Date(report.date)).toDateString()}
    </a>
  </li>
)

const showReports = (state, props) => ({reports: ReportStore.methods.getAllEditableReports('1')})