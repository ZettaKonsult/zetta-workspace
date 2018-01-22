import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import FormInput from '../components/FormInput'

import { saveProfile } from './profileActions'
import { getUserData } from './'

let ProfileForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="ssn"
        type="text"
        component={FormInput}
        label="ssn"
        disabled
      />
      <Field
        name="firstName"
        type="text"
        component={FormInput}
        label="firstName"
      />
      <Field
        name="lastName"
        type="text"
        component={FormInput}
        label="lastName"
      />
      <Field name="street" type="text" component={FormInput} label="street" />
      <Field name="city" type="text" component={FormInput} label="city" />
      <Field name="zipcode" type="text" component={FormInput} label="zipcode" />
      <Field name="mobile" type="text" component={FormInput} label="mobile" />
      <Field name="email" type="text" component={FormInput} label="email" />

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
