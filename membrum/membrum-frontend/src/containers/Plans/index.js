// @flow

import * as React from "react"

import * as actions from "./actions"

// import ConfirmModal from '../../components/Modal/ConfirmModal'
import CreatePlan from "./CreatePlan"
import ShowPlans from "./ShowPlans"
import NoPlans from "./NoPlans"

import "./style.css"

type State = {
  readPlan: boolean,
  plan: Object,
  data: Object[]
}

export default class Plans extends React.Component<{}, State> {
  constructor() {
    super()

    this.state = {
      showPlans: true,
      plan: {},
      data: [],
      sort: "labels"
    }
  }

  componentDidMount() {
    this.setState(actions.fetchPlans())
  }

  onCancel = () => {
    this.setState({ showPlans: true, plan: {} })
  }
  onChangePlan = e => {
    this.setState(actions.changePlan(e.target.id, e.target.value))
  }
  changeSort = value => {
    this.setState({ sort: value })
  }
  toggleCreateMode = e => {
    this.setState(actions.toggleCreateMode)
  }
  toggleReadMode = id => {
    this.setState(actions.toggleReadMode(id))
  }
  savePlan = e => {
    this.setState(actions.savePlan)
  }
  deletePlan = id => {
    this.setState(actions.deletePlan(id))
  }

  render() {
    const { data } = this.state

    if (data.length === 0) {
      return <NoPlans onClick={this.toggleCreateMode} />
    }

    if (this.state.showPlans) {
      return (
        <ShowPlans
          plans={data}
          readPlan={this.toggleReadMode}
          deletePlan={this.deletePlan}
          createPlan={this.toggleCreateMode}
          attributeToSort={this.state.sort}
          changeSort={this.changeSort}
        />
      )
    } else {
      return (
        <CreatePlan
          plan={this.state.plan}
          onSubmit={this.savePlan}
          onChange={this.onChangePlan}
          onCancel={this.onCancel}
          onDelete={this.deletePlan}
        />
      )
    }
  }
}
