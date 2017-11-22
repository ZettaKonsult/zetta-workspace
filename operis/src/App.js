import React, { Component } from 'react';
import ReportForm from './Container/Report/Report'
import Mypage from './Container/Mypage/Mypage'
import AdminDashboard from './Container/AdminDashboard/AdminDashboard'
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Operis</h1>
        </header>
        <ReportForm />
      </div>
    );
  }
}

export default App;
