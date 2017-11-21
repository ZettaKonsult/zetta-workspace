import React, { Component } from "react"

import Button from "../../../components/Button"
import FadedLine from "../../../components/FadedLine"
import Select from "../../../components/Select"

export default class EditMembership extends Component {
  render() {
    return (
      <div>
        <h1 className="PageTitle">Edit Membership</h1>
        <FadedLine />
        <div className="MembershipProfile" />
        <EditableMembership
          membership={this.props.membership}
          option={this.props.plans}
          onChange={this.props.onChange}
        />
        <div className="ButtonGroup">
          <Button onClick={this.props.onSubmit} large>
            Submit
          </Button>
          <Button onClick={this.props.cancel} large>
            Canel
          </Button>
        </div>
      </div>
    )
  }
}

const EditableMembership = props =>
  props.membership.map((item, i) => (
    <Select
      key={item.id}
      value={item.name}
      option={props.option}
      onChange={e => props.onChange(item.id, e.target.value)}
    />
  ))
