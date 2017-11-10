import React, { Component } from 'react'

import './style.css'

export default class Events extends Component {
  constructor(props) {
    super(props)

    this.state = {
      state: true
    }
  }

  render() {
    return (
      <div>
        <div className="Flagged">
          <span>ssn: YYMMDD-XXXX</span>
          <span>Name: Sture Student</span>
        </div>
        <div className="Flagged">
          <span>ssn: YYMMDD-XXXX</span>
          <span>Name: Sture Student</span>
        </div>
        <div className="Flagged">
          <span>ssn: YYMMDD-XXXX</span>
          <span>Name: Sture Student</span>
        </div>
        <div className="Flagged">
          <span>ssn: YYMMDD-XXXX</span>
          <span>Name: Sture Student</span>
        </div>
        <div className="Flagged">
          <span>ssn: YYMMDD-XXXX</span>
          <span>Name: Sture Student</span>
        </div>
        <div className="Flagged">
          <span>ssn: YYMMDD-XXXX</span>
          <span>Name: Sture Student</span>
        </div>
      </div>
    )
  }
}
