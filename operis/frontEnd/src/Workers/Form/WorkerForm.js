import React from 'react'
import { reduxForm, Field } from 'redux-form'

import { addWorker } from '../WorkerActions'

import validate from './WorkerFormValidation'
import { inputGroup } from './Components'

let WorkerForm = props => (
  <form
    onSubmit={props.handleSubmit(values => {
      props.dispatch(addWorker(values))
    })}>
    <Field
      name="name"
      component={inputGroup}
      type="text"
      placeholder="Full name"
    />
    <Field
      name="ssn"
      component={inputGroup}
      type="text"
      placeholder="Social security number"
    />
    <Field
      name="email"
      component={inputGroup}
      type="text"
      placeholder="Email"
    />
    <br />
    <button type="submit">Save</button>
  </form>
)

WorkerForm = reduxForm({ form: 'workerForm', validate })(WorkerForm)

export default WorkerForm
