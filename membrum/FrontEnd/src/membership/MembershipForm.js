import React from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'

import { membershipSave } from './membershipActions'
import { getPlanDetails, getPlanOptions } from './membershipReducer'

import planTemplate from './PlanTemplate'
import db from '../mocks/db.json'

const PlanSelect = ({ input, meta: { touched, error }, plans }) => (
  <select {...input} name="" id="">
    {plans.map(item => (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    ))}
  </select>
)

const renderPlans = ({
  fields,
  meta: { touched, error, submitFailed },
  ...props
}) => (
  <div className="membershipGroup">
    {(touched || submitFailed) &&
      error && <span>{error.map(e => <p>{e}</p>)}</span>}
    <div className="ButtonGroup">
      <button type="button" onClick={() => fields.push('17')}>
        Add Plan
      </button>
    </div>
    {fields.map((plan, index, field) => (
      <div key={plan}>
        <Field
          name={`${plan}`}
          component={PlanSelect}
          plans={props.getPlanOptions[index]}
        />
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
        getPlanOptions={props.getPlanOptions}
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

  const mapPlans = values.plans.map(plan => getPlanDetails(plan))
  const valid = validator.evaluatePlan(mapPlans)

  if (!valid) {
    const error = validator.getErrors(mapPlans)
    const errorArray = Object.keys(error).reduce(
      (result, key) => [...result, ...error[key]],
      []
    )
    return { plans: { _error: errorArray } }
  } else {
    return {}
  }
}

MembershipForm = reduxForm({ form: 'MembershipForm', validate })(MembershipForm)

const mapStateToProps = (state, props) => ({
  allPlans: state.membershipReducer.allPlans,
  getPlanOptions: getPlanOptions(state.membershipReducer),
  initialValues: { plans: state.membershipReducer.plans },
  getPlanDetails: planId => getPlanDetails(state.membershipReducer)(planId)
})

const mapDispatchToProps = {
  onSubmit: values => membershipSave(values.plans)
}

export default connect(mapStateToProps, mapDispatchToProps)(MembershipForm)
