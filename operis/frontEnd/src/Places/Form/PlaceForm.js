import React from 'react'
import { reduxForm, Field } from 'redux-form'

import { addPlace } from '../PlaceActions'

import validate from './PlaceFormValidation'
import { Input } from '../../Components/Form/Input'
import { Form, Button, Divider } from 'semantic-ui-react'

let PlaceForm = props => (
  <Form
    autoComplete="off"
    onSubmit={props.handleSubmit(values => {
      props.dispatch(addPlace(values))
      if (typeof props.callback !== 'undefined') {
        props.callback()
      }
    })}>
    <Field name="name" component={Input} placeholder="Name of place" />
    <Field
      name="town"
      component={Input}
      placeholder="City place is located at"
    />
    <Divider />
    <Button type="submit">Save</Button>
  </Form>
)

PlaceForm = reduxForm({ form: 'placeForm', validate })(PlaceForm)

export default PlaceForm
