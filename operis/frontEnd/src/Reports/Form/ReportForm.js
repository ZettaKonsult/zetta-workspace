import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { withRouter } from 'react-router-dom'

import { addReport } from '../ReportActions'

import { getReportById } from '../reports'

import validate from './ReportFormValidation'
import { inputGroup, textGroup } from './Components'

let ReportForm = props => (
  <form
    onSubmit={props.handleSubmit(values => {
      props.dispatch(addReport(values))
      props.history.push('/')
    })}>
    <Field name="date" component={inputGroup} type="date" placeholder="Date" />
    <Field
      name="hours"
      component={inputGroup}
      type="number"
      placeholder="Hours"
    />
    <Field
      name="driving"
      component={inputGroup}
      type="number"
      placeholder="Driving"
    />
    <Field
      name="extrawork"
      component={textGroup}
      type="text"
      placeholder="Extra Work"
    />
    <Field
      name="extrahours"
      component={inputGroup}
      type="number"
      placeholder="extrahours"
    />
    <br />
    <button type="submit">Save report</button>
  </form>
)

ReportForm = reduxForm({ form: 'reportForm', validate })(ReportForm)

//TODO abstract away withrouter, let users of the form send in a onsubmit function
export default withRouter(
  connect((state, props) => {
    if (!!props.id) {
      return { initialValues: getReportById(state.reports, props.id) }
    }
    return {}
  })(ReportForm)
)
