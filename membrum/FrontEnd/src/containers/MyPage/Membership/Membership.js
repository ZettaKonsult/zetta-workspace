import React, { Component } from "react"

import EditMembership from "./EditMembership"
import NoMembership from "./NoMembership"

import Button from "../../../components/Button"
import db from "../../../mocks/db.json"

import "./membership.css"

export default class Membership extends Component {
  constructor() {
    super()

    this.state = {
      membership: [],
      editMembership: false
    }
  }
  componentDidMount() {
    this.setState({ membership: getMembership("910504-0035") })
  }

  submitEditMembership = membership =>
    this.setState({ membership, editMembership: false })

  editMembership = () =>
    this.setState((state, props) => ({
      editMembership: !state.editMembership
    }))

  registerUndefined = () =>
    this.setState({
      isSuccess: true
    })

  onPlanChange = (id, newId) => {
    this.setState(onPlanChange(id, newId))
  }

  render() {
    const { editMembership } = this.state

    if (editMembership) {
      return (
        <EditMembership
          plans={getPlans()}
          membership={this.state.membership}
          onSubmit={this.submitEditMembership}
          cancel={this.editMembership}
          onChange={this.onPlanChange}
        />
      )
    }

    if (
      this.state.membership.length === 0 ||
      typeof this.state.membership === "undefined"
    ) {
      return <NoMembership />
    }

    return (
      <div className="membership">
        {this.state.membership.map((item, i) => (
          <div key={i} className="membershipGroup">
            <h3 className="GroupTitle">{item.name}</h3>
          </div>
        ))}

        <div className="ButtonGroup">
          <Button onClick={this.editMembership} large>
            Edit Membership
          </Button>
          <Button onClick={this.registerUndefined} large>
            Register Undefined
          </Button>
        </div>
      </div>
    )
  }
}

const onPlanChange = (id, newId) => (state, props) => {
  const index = state.membership.findIndex(item => item.id === id)
  return {
    membership: [
      ...state.membership.slice(0, index),
      findPlanAttribute("name", newId),
      ...state.membership.slice(index + 1)
    ]
  }
}

const findPlan = id => db.plans.find(item => item.id === id)

const findPlanAttribute = (attribute, value) =>
  db.plans.find(item => item[attribute] === value)

const getPlans = () =>
  db.plans.reduce((result, plan) => [...result, plan.name], [])

const getMembership = ssn => {
  const membership = db.members.find(item => item.ssn === ssn).membership
  const plans = membership.map(id => findPlan(id))
  return plans
}
