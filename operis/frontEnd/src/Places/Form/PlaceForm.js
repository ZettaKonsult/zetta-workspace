import React from 'react'
import { reduxForm, Field } from 'redux-form'

import { addPlace } from '../PlaceActions'

import validate from './PlaceFormValidation'
import { inputGroup } from './Components'

let PlaceForm = props => (
  <form
    onSubmit={props.handleSubmit(values => {
      props.dispatch(addPlace(values))
    })}>
    <Field
      name="name"
      component={inputGroup}
      type="text"
      placeholder="Name of place"
    />
    <Field
      name="town"
      component={inputGroup}
      type="text"
      placeholder="City place is located at"
    />
    <br />
    <button type="submit">Save</button>
  </form>
)

PlaceForm = reduxForm({ form: 'placeForm', validate })(PlaceForm)

export default PlaceForm
