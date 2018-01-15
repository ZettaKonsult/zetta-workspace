import React from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'

import { membershipSave } from './membershipActions'
import { getPlanDetails, getPlanOptions } from './membershipReducer'

import planTemplate from './PlanTemplate'
import db from '../mocks/db.json'

const PlanSelect = ({
  input,
  meta: { touched, error },
  plans,
  getPlanOptions
}) => (
  <select {...input}>
    {getPlanOptions(input.value).map(item => (
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
      error && (
        <span style={{ color: 'red' }}>
          {error.map((e, i) => <p key={i}>{e}</p>)}
        </span>
      )}
    <div className="ButtonGroup">
      <button type="button" onClick={() => fields.push('0')}>
        Add Plan
      </button>
    </div>
    {fields.map((plan, index, field) => (
      <div key={plan}>
        <Field
          name={`${plan}`}
          component={PlanSelect}
          getPlanOptions={props.getPlanOptions}
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
  initialValues: { plans: state.membershipReducer.plans },
  getPlanOptions: planId => getPlanOptions(state.membershipReducer)(planId),
  getPlanDetails: planId => getPlanDetails(state.membershipReducer)(planId)
})

const mapDispatchToProps = {
  onSubmit: values => membershipSave(values.plans)
}

export default connect(mapStateToProps, mapDispatchToProps)(MembershipForm)
