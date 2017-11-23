import React, { Component } from 'react';
import ReportForm from './ReportForm'
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super()

    this.state = {
      isCool: 1
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Operis</h1>
        </header>
        <ReportForm />
      </div>
    );
  }
}

export default App;
