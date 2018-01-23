import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { membersFetch } from './membersActions'
import { getVisibleMembers } from './membersReducer'

let VisibleMembersList = props => (
  <div>
    <button onClick={props.membersFetch}>Fetch Members</button>
    <h3>Members</h3>
    {props.members.map(member => (
      <div key={member.ssn}>{member.firstName}</div>
    ))}
  </div>
)

const mapStateToProps = (state, props) => ({
  members: getVisibleMembers(state.membersReducer, props.value)
})

const mapDispatchToProps = {
  membersFetch
}

VisibleMembersList = connect(mapStateToProps, mapDispatchToProps)(
  VisibleMembersList
)

class MemberFind extends Component {
  constructor() {
    super()
    this.state = { value: '' }
  }
  handleChange = value => {
    this.setState({ value })
  }
  render() {
    return (
      <div>
        <input
          value={this.state.value}
          onChange={e => this.handleChange(e.target.value)}
          type="text"
        />
        <VisibleMembersList value={this.state.value} />
      </div>
    )
  }
}

export default withRouter(MemberFind)
