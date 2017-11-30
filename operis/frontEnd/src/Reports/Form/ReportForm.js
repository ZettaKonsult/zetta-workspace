import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { withRouter } from 'react-router-dom'

import { addReport } from '../ReportActions'

import { getReportById } from '../reports'
import { getWorkers, getPlaces } from '../../reducers'

import validate from './ReportFormValidation'
import { inputGroup, textGroup, selectGroup } from './Components'

let ReportForm = props => (
  <form
    onSubmit={props.handleSubmit(values => {
      props.dispatch(addReport(values))
    })}>
    <Field name="date" component={inputGroup} type="date" placeholder="Date" />
    <Field
      name="worker"
      component={selectGroup}
      type="text"
      placeholder="Worker">
      {props.workers.map(worker => (
        <option key={worker.id} value={worker.id}>
          {worker.name}
        </option>
      ))}
    </Field>
    <Field
      name="place"
      component={selectGroup}
      type="text"
      placeholder="Workplace">
      {props.places.map(place => (
        <option key={place.id} value={place.id}>
          {place.name}
        </option>
      ))}
    </Field>
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
  connect((state, props) => ({
    initialValues: getReportById(state.reports, props.id),
    workers: getWorkers(state),
    places: getPlaces(state)
  }))(ReportForm)
)
