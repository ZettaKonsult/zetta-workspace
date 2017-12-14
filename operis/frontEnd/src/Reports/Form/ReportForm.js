import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { Form, Button, Divider } from 'semantic-ui-react'

import { addReport, updateReport } from '../ReportActions'

import { getReportById, isReportId } from '../../reducers'
import { getWorkers, getPlaces } from '../../reducers'

import validate from './ReportFormValidation'
import { textGroup, selectGroup } from './Components'
import { Input } from '../../Components/Form/Input'
import { Dropdown } from '../../Components/Form/Dropdown'

let ReportForm = props => (
  <Form
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
    <Field name="date" component={Input} type="date" placeholder="Date" />
    <Field
      name="worker"
      component={Dropdown}
      placeholder="Worker"
      options={props.workers.map(worker => ({
        key: worker.id,
        value: worker.id,
        text: worker.name
      }))}
    />
    <Field
      name="place"
      component={Dropdown}
      placeholder="Workplace"
      options={props.places.map(place => ({
        key: place.id,
        value: place.id,
        text: place.name
      }))}
    />
    <Field name="hours" component={Input} type="number" placeholder="Hours" />
    <Field
      name="driving"
      component={Input}
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
      component={Input}
      type="number"
      placeholder="extrahours"
    />
    <Divider />
    <Button type="submit">Save report</Button>
  </Form>
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
