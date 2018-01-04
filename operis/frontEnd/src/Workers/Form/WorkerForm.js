import React from 'react'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form'
import {Form, Button, Divider} from 'semantic-ui-react'

import {addWorker, updateWorker} from '../WorkerActions'

import {isWorkerId, getWorkerById} from '../../reducers'

import validate from './WorkerFormValidation'
import {Input} from '../../Components/Form/Input'

let WorkerForm = props => (
  <Form
    autoComplete="off"
    onSubmit={props.handleSubmit(values => {
      if (props.idExists) {
        props.updateWorker(values)
      } else {
        props.addNewWorker(values)
      }
      if (typeof props.callback !== 'undefined') {
        props.callback()
      }
    })}
  >
    <Field name="name" component={Input} placeholder="Full name" />
    <Field name="ssn" component={Input} placeholder="Social security number" />
    <Field name="email" component={Input} placeholder="Email" />
    <Divider />
    <Button type="submit" primary content="Save" />
  </Form>
)

WorkerForm = reduxForm({form: 'workerForm', validate})(WorkerForm)

const mapDispatchToProps = dispatch => ({
  addNewWorker: values => dispatch(addWorker(values)),
  updateWorker: values => dispatch(updateWorker(values))
})

const mapStateToProps = (state, props) => ({
  idExists: isWorkerId(state, props.id),
  initialValues: getWorkerById(state, props.id)
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkerForm)
