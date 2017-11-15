import React, { Component } from "react"

import EditMembership from "./EditMembership"

import Button from "../../components/Button"

export default class Membership extends Component {
  constructor() {
    super()

    this.state = {
      membership: null,
      editMembership: false
    }
  }
  componentWillMount() {}

  submitEditMembership = membership =>
    this.setState({ membership, editMembership: false })

  editMembership = () =>
    this.setState({ editMembership: !this.state.editMembership })

  registerUndefined = () =>
    this.setState({
      isSuccess: true
    })

  render() {
    const { membership, editMembership } = this.state
    return (
      <div className="membership">
        {editMembership ? (
          <EditMembership
            onSubmit={this.submitEditMembership}
            cancel={this.editMembership}
          />
        ) : (
          membership.map((item, i) => (
            <div key={i} className="membershipGroup">
              <h3 className="GroupTitle">{item.group}</h3>
              {item.organisations.map((item, i) => (
                <span key={i} className="membershipLine">
                  {item}
                </span>
              ))}
            </div>
          ))
        )}
        {!editMembership && (
          <div className="ButtonGroup">
            <Button onClick={this.editMembership} large>
              Edit Membership
            </Button>
            <Button onClick={this.registerUndefined} large>
              Register Undefined
            </Button>
          </div>
        )}
      </div>
    )
  }
}
