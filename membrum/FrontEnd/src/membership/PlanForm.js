import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { getPlanById } from './membershipReducer'
import { planSave } from './planActions'

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error },
  disabled
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} disabled={disabled} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

let PlanForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="name" type="text" component={renderField} label="name" />
      <Field name="amount" type="text" component={renderField} label="amount" />
      <Field
        name="interval"
        type="text"
        component={renderField}
        label="interval"
      />
      <Field
        name="intervalCount"
        type="text"
        component={renderField}
        label="intervalCount"
      />
      <Field name="labels" type="text" component={renderField} label="labels" />
      <Field name="group" type="text" component={renderField} label="group" />
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
    initialValues: getPlanById(state.membershipReducer)(match.params.id),
    enableReinitialize: true
  }
}

const mapDispatchToProps = {
  onSubmit: values => planSave(values)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanForm)
