import React, { Component } from 'react'

import Button from '../../components/Button'

import './style.css'

export default class SelfHelp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isDone: false,
      step: 0,
      answears: [],
      selectedAnswear: false
    }
  }

  onClick = e => this.setState({ selectedAnswear: e.target.id })
  getClassName = id =>
    this.state.selectedAnswear === id ? 'Answear Selected' : 'Answear'
  render() {
    return (
      <div className="selfHelp">
        <h1>Help</h1>
        <div className="QuestionTree">
          {this.state.step === 0 && (
            <div className="QuestionTreeForm">
              <div className="Question">
                What is your general area of problem
              </div>
              <span
                id="0"
                className={this.getClassName('0')}
                onClick={this.onClick}
              >
                digital card won't update
              </span>
              <span
                id="1"
                className={this.getClassName('1')}
                onClick={this.onClick}
              >
                Don't have the travel logos for discount
              </span>
              <span
                id="2"
                className={this.getClassName('2')}
                onClick={this.onClick}
              >
                Can't register for a card
              </span>
              <div className="ButtonGroup">
                <Button large type="danger">
                  Back
                </Button>
                <Button large type="success">
                  Next
                </Button>
              </div>
            </div>
          )}

          {this.state.step === 1 && (
            <div>
              <div className="Question">Are you studying this semester?</div>
              <this.Span text="Yes" />
              <this.Span text="No" />
              <this.Span text="Starting next semester" />
            </div>
          )}

          {this.state.step === 2 && (
            <div>
              <div className="Question">
                Have you paid your semester fee and have the money been deducted
                from your account?
              </div>
              <this.Span text="Not paid" />
              <this.Span text="Paid and money has been drawn" />
            </div>
          )}

          {this.state.step === 3 && (
            <div>
              <div className="Question">
                Thanks for filling out the form, we could not find the solution
                based on your answears.
                <br />
                Your account has been flagged for help, one of our admins will
                contact you as soon as the problem is solved.
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
