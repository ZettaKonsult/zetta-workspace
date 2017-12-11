import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import { addReport, updateReport } from '../ReportActions'

import { getReportById, isReportId } from '../../reducers'
import { getWorkers, getPlaces } from '../../reducers'

import validate from './ReportFormValidation'
import { inputGroup, textGroup, selectGroup } from './Components'

let ReportForm = props => (
  <form
    onSubmit={props.handleSubmit(values => {
      if (props.idExists) {
        props.updateReport(values)
      } else {
        props.addNewReport(values)
      }
      if (typeof props.callback !== 'undefined') {
        props.callback()
      }
    })}>
    <Field name="date" component={inputGroup} type="date" placeholder="Date" />
    <Field
      name="worker"
      component={selectGroup}
      type="text"
      placeholder="Worker">
      <option />
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
      <option />
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

const mapStateToProps = (state, props) => ({
  idExists: isReportId(state, props.id),
  initialValues: getReportById(state, props.id),
  workers: getWorkers(state),
  places: getPlaces(state)
})

const mapDispatchToProps = dispatch => ({
  addNewReport: values => dispatch(addReport(values)),
  updateReport: values => dispatch(updateReport(values))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm)
