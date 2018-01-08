import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import {
  membershipFetchRequest,
  fetchAllPlans,
  membershipSave
} from './membershipActions'
import './membership.css'

const PlanOptions = ({ plans }) =>
  plans.map(item => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ))

const renderPlans = ({ fields, ...props }) =>
  fields.map((plan, index, field) => (
    <Field key={index} name={`${plan}`} component="select">
      <PlanOptions plans={props.allPlans} />
    </Field>
  ))

let Form = props => {
  const { isFetching, membership, handleSubmit } = props
  if (isFetching && !membership.length) {
    return <p>Loading...</p>
  }
  return (
    <form onSubmit={handleSubmit} className="membership">
      <div className="membershipGroup">
        <FieldArray
          name="plans"
          component={renderPlans}
          allPlans={props.allPlans}
        />
      </div>
      <div className="ButtonGroup">
        <button type="submit">Submit</button>
        <button onClick={this.registerUndefined}>Register Undefined</button>
      </div>
    </form>
  )
}

Form = reduxForm({ form: 'MembershipForm' })(Form)

class MembershipForm extends Component {
  componentDidMount() {
    this.props.fetchAllPlans()
  }

  handleSubmit(values) {
    this.props.membershipSave(values.plans)
  }

  render() {
    return (
      this.props.plans && (
        <Form
          initialValues={{ plans: this.props.plans }}
          allPlans={this.props.allPlans}
          onSubmit={values => this.handleSubmit(values)}
        />
      )
    )
  }
}

const mapStateToProps = (state, props) => ({
  allPlans: state.membershipReducer.allPlans,
  plans: state.membershipReducer.plans,
  isFetching: state.membershipReducer.isFetching
})

const mapDispatchToProps = {
  membershipFetchRequest,
  fetchAllPlans,
  membershipSave: values => membershipSave(values)
}

export default connect(mapStateToProps, mapDispatchToProps)(MembershipForm)
