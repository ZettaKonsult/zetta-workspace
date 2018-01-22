import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import FormInput from '../components/FormInput'

import { getPlanById } from './membershipReducer'
import { planSave } from './planActions'

let PlanForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="name" type="text" component={FormInput} label="name" />
      <Field name="amount" type="text" component={FormInput} label="amount" />
      <Field
        name="interval"
        type="text"
        component={FormInput}
        label="interval"
      />
      <Field
        name="intervalCount"
        type="text"
        component={FormInput}
        label="intervalCount"
      />
      <Field name="labels" type="text" component={FormInput} label="labels" />
      <Field name="group" type="text" component={FormInput} label="group" />
      <button type="submit" disabled={submitting || pristine}>
        Submit
      </button>
    </form>
  )
}

PlanForm = reduxForm({
  form: 'PlanForm'
})(PlanForm)

const mapStateToProps = (state, { match }) => {
  return {
    initialValues: getPlanById(state.membershipReducer, match.params.id),
    enableReinitialize: true
  }
}

const mapDispatchToProps = {
  onSubmit: values => planSave(values)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanForm)
