import React, { Component } from 'react'

import Button from '../../components/Button'
import FadedLine from '../../components/FadedLine'
import Select from '../../components/Select'

import './style.css'

//TODO fetch sub from dbSubscription
export default class EditMembership extends Component {
  constructor(props) {
    super(props)
    this.plansGroup = ['obligatory', 'nations', 'unions']
    this.plans = {}
    this.state = {
      obligatory: ['trfPlan'],
      nations: ['undefinedPlan'],
      unions: ['unionPlan']
    }
  }

  async componentWillMount() {
    this.plans['obligatory'] = this.props.Database.getItemsByAttribute(
      'group',
      'obligatory'
    )
    this.plans['nations'] = this.props.Database.getItemsByAttribute(
      'group',
      'nations'
    )
    this.plans['unions'] = this.props.Database.getItemsByAttribute(
      'group',
      'unions'
    )
  }

  wrapState = () => [
    { group: 'obligatory', organisations: this.state.obligatory },
    { group: 'nations', organisations: this.state.nations },
    { group: 'unions', organisations: this.state.unions }
  ]

  onChange = (e, groupName, index) =>
    this.setState({
      [groupName]: updateObjectInArray(
        this.state[groupName],
        e.target.value,
        index
      )
    })

  addToGroup = group =>
    this.setState({ [group]: [...this.state[group], 'Undefined Nation'] })

  removeFromGroup = (group, index) =>
    this.setState({
      [group]: removeObjectInArray(this.state[group], index)
    })

  getPlansName = group => this.plans[group].map(Plan => Plan.name)

  OrganisationColumn = ({ planGroup }) =>
    this.state[planGroup].map((item, i) => (
      <div className="MembershipRow" key={i}>
        <Select
          onChange={e => this.onChange(e, planGroup, i)}
          option={this.getPlansName(planGroup)}
          value={item}
        />
        <span
          className="removeOrganisation"
          onClick={() => this.removeFromGroup(planGroup, i)}
        >
          &times;
        </span>
      </div>
    ))

  render() {
    return (
      <div>
        <h1 className="PageTitle">Edit Membership</h1>
        <FadedLine />
        <div className="MembershipProfile">
          {this.plansGroup.map((planGroup, i) => (
            <div className="OrganisationColumn" key={i}>
              <h1 className="GroupTitle">{planGroup}</h1>
              <FadedLine />

              <this.OrganisationColumn planGroup={planGroup} />

              <div className="ButtonGroup">
                <Button
                  large
                  mode="info"
                  onClick={() => this.addToGroup(planGroup)}
                >
                  Add {planGroup}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="ButtonGroup">
          <Button onClick={() => this.props.onSubmit(this.wrapState())} large>
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

const updateObjectInArray = (array, newItem, index) =>
  array.map((item, i) => {
    if (i !== index) {
      return item
    }

    return newItem
  })

const removeObjectInArray = (array, index) => [
  ...array.slice(0, index),
  ...array.slice(index + 1, array.length)
]
