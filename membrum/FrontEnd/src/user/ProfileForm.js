import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { saveProfile } from './profileActions'
import { getUserData } from './'

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

let ProfileForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="ssn"
        type="text"
        component={renderField}
        label="ssn"
        disabled
      />
      <Field
        name="firstName"
        type="text"
        component={renderField}
        label="firstName"
      />
      <Field
        name="lastName"
        type="text"
        component={renderField}
        label="lastName"
      />
      <Field name="street" type="text" component={renderField} label="street" />
      <Field name="city" type="text" component={renderField} label="city" />
      <Field
        name="zipcode"
        type="text"
        component={renderField}
        label="zipcode"
      />
      <Field name="mobile" type="text" component={renderField} label="mobile" />
      <Field name="email" type="text" component={renderField} label="email" />

      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

ProfileForm = reduxForm({
  form: 'ProfileFrom'
})(ProfileForm)

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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)
