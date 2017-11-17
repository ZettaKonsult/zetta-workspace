import React, { Component } from "react"

import Button from "../../../components/Button"
import FadedLine from "../../../components/FadedLine"
import Select from "../../../components/Select"

export default class EditMembership extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1 className="PageTitle">Edit Membership</h1>
        <FadedLine />
        <div className="MembershipProfile" />
        <EditableMembership
          membership={this.props.membership}
          option={this.props.plans}
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
    <Select key={i} value={item.name} option={props.option} />
  ))
