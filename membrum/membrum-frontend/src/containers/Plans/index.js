// @flow

import * as React from 'react';

import * as actions from './actions'

// import ConfirmModal from '../../components/Modal/ConfirmModal'
import CreatePlan from './CreatePlan'
import ShowPlans from './ShowPlans'

import './style.css'

type State = {
  readPlan: boolean,
  plan: Object,
  data: Object[],
}

export default class Plans extends React.Component<{}, State> {
  constructor() {
    super()

    this.state = {
      showPlans: true,
      plan: {},
      data: []
    }
  }

  componentDidMount(){
    this.setState(actions.fetchPlans)
  }

  onChangePlan = (e) => {
    this.setState(actions.changePlan(e.target.id, e.target.value))
  }
  toggleCreateMode = e => {
    this.setState(actions.toggleCreateMode)
  }
  toggleReadMode = e => {
    this.setState(actions.toggleReadMode(e.target.id))
  }
  savePlan = e => {
    this.setState(actions.savePlan)
  }
  deletePlan = (e) => {
    this.setState(actions.deletePlan(e.target.id))
  }

  render() {
    const {data} = this.state
    return (
      <div>
        {this.state.showPlans ?  (
          <ShowPlans
            plans={data}
            readPlan={this.toggleReadMode}
            deletePlan={this.deletePlan}
            createPlan={this.toggleCreateMode}
          />
        ): (
          <CreatePlan
            plan={this.state.plan}
            onSubmit={this.savePlan}
            onChange={this.onChangePlan}
          />
        )}
      </div>
    )
  }
}
