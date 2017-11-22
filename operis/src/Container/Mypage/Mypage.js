import React, { Component } from 'react';

import './Mypage.css'

class Mypage extends Component {

  render() {
    return (
      <div className='Mypage'>
        <button>Create new report</button>
        <ul className='ReportList'>
          <li className='ReportItem'><a className='ReportLink' href="#">Report date: 2017-01-01</a></li>
          <li className='ReportItem'><a className='ReportLink' href="#">Report date: 2017-01-01</a></li>
          <li className='ReportItem'><a className='ReportLink' href="#">Report date: 2017-01-01</a></li>
          <li className='ReportItem'><a className='ReportLink' href="#">Report date: 2017-01-01</a></li>
          <li className='ReportItem'><a className='ReportLink' href="#">Report date: 2017-01-01</a></li>
        </ul>
      </div>
    )
  }

}

export default Mypage
