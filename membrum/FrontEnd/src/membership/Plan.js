import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

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
    </form>
  )
}

PlanForm = reduxForm({
  form: 'PlanForm'
})(PlanForm)

const mapStateToProps = state => {
  return {
    initialValues: getUserData(state.userReducer),
    enableReinitialize: true
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: values => saveProfile(values)(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanForm)
