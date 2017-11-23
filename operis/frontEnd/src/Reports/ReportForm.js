import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { addReport } from './ReportActions'

let ReportForm = props => (
  <form
    onSubmit={props.handleSubmit(values => props.dispatch(addReport(values)))}>
    <Field name="date" component="input" type="text" placeholder="Date" />
    <Field name="hours" component="input" type="text" placeholder="hours" />
    <Field name="driving" component="input" type="text" placeholder="driving" />
    <Field
      name="extrawork"
      component="input"
      type="text"
      placeholder="extrawork"
    />
    <Field
      name="extrahours"
      component="input"
      type="text"
      placeholder="extrahours"
    />

    <button type="submit">Save report</button>
  </form>
)

ReportForm = reduxForm({ form: 'reportForm' })(ReportForm)

export default connect()(ReportForm)
