import React from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'

import { membershipSave } from './membershipActions'
import { getPlanDetails } from './membershipReducer'

import planTemplate from './PlanTemplate'
import db from '../mocks/db.json'

const PlanOptions = ({ plans }) =>
  plans.map(item => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ))

const renderPlans = ({
  fields,
  meta: { touched, error, submitFailed },
  ...props
}) => (
  <div className="membershipGroup">
    {(touched || submitFailed) && error && <span>{error}</span>}
    <div className="ButtonGroup">
      <button type="button" onClick={() => fields.push('17')}>
        Add Plan
      </button>
    </div>
    {fields.map((plan, index, field) => (
      <div key={index}>
        <Field name={`${plan}`} component="select">
          <PlanOptions plans={props.allPlans} />
        </Field>
        <button
          type="button"
          title="Remove"
          onClick={() => fields.remove(index)}>
          Remove Plan
        </button>
      </div>
    ))}
  </div>
)

let MembershipForm = props => {
  const { handleSubmit, submitting, pristine } = props
  return (
    <form onSubmit={handleSubmit} className="membership">
      <FieldArray
        name="plans"
        component={renderPlans}
        allPlans={props.allPlans}
      />
      <button type="submit" disabled={submitting || pristine}>
        Submit
      </button>
    </form>
  )
}

const validate = (values, { getPlanDetails }) => {
  const rules = db.plantemplates
  const validator = planTemplate(rules)

  const errors = {}
  const mapPlans = values.plans.map(plan => getPlanDetails(plan))
  const valid = validator.evaluatePlan(mapPlans)

  if (!valid) {
    errors.plans = { _error: 'AF is not a part of this' }
    const error = validator.getErrors(mapPlans)
    console.log(error)
  } else {
    const membersArrayErrors = []
    values.plans.forEach((plan, planIndex) => {
      const planErrors = {}
      console.log(plan)
      if (!plan || !plan.firstName) {
        planErrors.firstName = 'Required'
        membersArrayErrors[planIndex] = planErrors
      }
    })
    if (membersArrayErrors.length) {
      errors.members = membersArrayErrors
    }
  }
  return errors
}

MembershipForm = reduxForm({ form: 'MembershipForm', validate })(MembershipForm)

const mapStateToProps = (state, props) => ({
  allPlans: state.membershipReducer.allPlans,
  initialValues: { plans: state.membershipReducer.plans },
  getPlanDetails: id => getPlanDetails(state.membershipReducer)(id)
})

const mapDispatchToProps = {
  onSubmit: values => membershipSave(values.plans)
}

export default connect(mapStateToProps, mapDispatchToProps)(MembershipForm)
