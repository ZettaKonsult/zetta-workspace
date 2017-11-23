import React, { Component } from 'react';

import './AdminDashboard.css'

class AdminDashboard extends Component {
  render() {
    return (
      <div className='AdminDashboard'>
        <ul className='AdminDashboardList'>
          <h2>Title 1</h2>
          <li>0</li>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
        <ul className='AdminDashboardList'>
          <h2>Title 2</h2>
          <li>0</li>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </div>
    )
  }
}


export default AdminDashboard
