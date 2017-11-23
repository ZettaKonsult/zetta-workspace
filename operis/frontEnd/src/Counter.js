import React, { Component } from 'react'

export default class Counter extends Component {
  constructor() {
    super()
    this.state = {
      number: 0
    }
  }

  componentDidMount() {
    this.setState(this.init)
  }

  componentDidUpdate() {
    console.log(`I updated to ${this.state.number}.`)
  }

  onClick = () => {
    this.setState(this.update)
  }

  update = (state, props) => ({
    number: state.number + props.increment
  })

  init = (state, props) => ({
    number: props.startValue
  })

  render() {
    return(
      <div onClick={this.onClick}>
        {this.state.number}.
      </div>
    )
  }
}
