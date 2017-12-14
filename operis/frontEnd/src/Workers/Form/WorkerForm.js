import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Form, Button, Divider } from 'semantic-ui-react'

import { addWorker } from '../WorkerActions'

import validate from './WorkerFormValidation'
import { Input } from '../../Components/Form/Input'

let WorkerForm = props => (
  <Form
    onSubmit={props.handleSubmit(values => {
      props.dispatch(addWorker(values))
      if (typeof props.callback !== 'undefined') {
        props.callback()
      }
    })}>
    <Field name="name" component={Input} placeholder="Full name" />
    <Field name="ssn" component={Input} placeholder="Social security number" />
    <Field name="email" component={Input} placeholder="Email" />
    <Divider />
    <Button type="submit" primary content="Save" />
  </Form>
)

WorkerForm = reduxForm({ form: 'workerForm', validate })(WorkerForm)

export default WorkerForm
