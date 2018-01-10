import React from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'

import { membershipSave } from './membershipActions'

const PlanOptions = ({ plans }) =>
  plans.map(item => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ))

const renderPlans = ({ fields, ...props }) => (
  <div className="membershipGroup">
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
          onClick={() => fields.remove(index)}
        >
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

MembershipForm = reduxForm({ form: 'MembershipForm' })(MembershipForm)

const mapStateToProps = (state, props) => ({
  allPlans: state.membershipReducer.allPlans,
  initialValues: { plans: state.membershipReducer.plans }
})

const mapDispatchToProps = {
  onSubmit: values => membershipSave(values.plans)
}

export default connect(mapStateToProps, mapDispatchToProps)(MembershipForm)
