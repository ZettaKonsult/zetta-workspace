import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Form, Button, Divider } from 'semantic-ui-react';

import { postInvoiceRow } from '../ReportActions';

import { getReportById, isReportId } from '../../reducers';
import { getWorkers, getPlaces } from '../../reducers';

import validate from './ReportFormValidation';
import { TextArea } from '../../Components/Form/TextArea';
import { Input } from '../../Components/Form/Input';
import { Dropdown } from '../../Components/Form/Dropdown';

let ReportForm = props => (
  <Form
    autoComplete="off"
    onSubmit={props.handleSubmit(values => {
      if (props.idExists) {
        props.updateReport(values);
      } else {
        props.addNewReport(values);
      }
      if (typeof props.callback !== 'undefined') {
        props.callback();
      }
    })}
  >
    <Field name="createdAt" component={Input} type="date" placeholder="Date" />
    <Field
      name="recipient"
      component={Dropdown}
      placeholder="Recipient"
      options={props.recipients.map(recipient => ({
        key: recipient.id,
        value: recipient.id,
        text: `${recipient.firstName} ${recipient.lastName}`,
      }))}
    />
    <Field
      name="interval"
      component={Input}
      type="number"
      placeholder="Hours"
    />
    <Field name="price" component={Input} type="number" placeholder="Price" />
    <Field name="description" component={TextArea} placeholder="Description" />
    <Divider />
    <Button type="submit">Save report</Button>
  </Form>
);

ReportForm = reduxForm({ form: 'reportForm', validate })(ReportForm);

const mapStateToProps = (state, props) => ({
  idExists: isReportId(state, props.id),
  initialValues: getReportById(state, props.id),
  workers: getWorkers(state),
  recipients: getPlaces(state),
});

const mapDispatchToProps = dispatch => ({
  addNewReport: values => dispatch(postInvoiceRow(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);
