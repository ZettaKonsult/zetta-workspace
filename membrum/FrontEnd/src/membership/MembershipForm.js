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

const renderPlans = ({ fields, ...props }) => (
  <div className="membershipGroup">
    <div className="ButtonGroup">
      <button type="button" onClick={() => fields.push(17)}>
        Add Plan
      </button>
    </div>
    {fields.map((plan, index, field) => (
      <div>
        <Field key={index} name={`${plan}`} component="select">
          <PlanOptions plans={props.allPlans} />
        </Field>
        <button
          type="button"
          title="Remove"
          onClick={() => fields.remove(index)}
        >
          Remove Plan
        </button>
      </div>
    ))}
  </div>
)

let Form = props => {
  const { isFetching, membership, handleSubmit, submitting } = props
  if (isFetching && !membership.length) {
    return <p>Loading...</p>
  }
  return (
    <form onSubmit={handleSubmit} className="membership">
      <FieldArray
        name="plans"
        component={renderPlans}
        allPlans={props.allPlans}
      />
      <button type="submit" disabled={submitting}>
        Submit
      </button>
    </form>
  )
}

Form = reduxForm({ form: 'MembershipForm' })(Form)

class MembershipForm extends Component {
  componentDidMount() {
    this.props.fetchAllPlans()
    this.props.membershipFetchRequest()
  }

  handleSubmit(values) {
    this.props.membershipSave(values.plans)
  }

  render() {
    if (this.props.plans.length === 0) {
      return <p>Loading</p>
    }
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
