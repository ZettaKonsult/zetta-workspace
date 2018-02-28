import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Form, Button, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { postInvoiceRow } from '../ReportActions';

import { getReportById, isReportId } from '../../reducers';
import { getPlaces } from '../../reducers';

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
      name="recipientId"
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
    <Button as={Link} to={`/report`} content="Cancel" />
  </Form>
);

ReportForm = reduxForm({ form: 'reportForm', validate })(ReportForm);

const mapStateToProps = (state, props) => ({
  idExists: isReportId(state, props.id),
  initialValues: getReportById(state, props.id),
  recipients: getPlaces(state),
});

//TODO ABSTRACT COMPANYCUSTOMERID
const mapDispatchToProps = dispatch => ({
  addNewReport: values =>
    dispatch(postInvoiceRow(values, 'cjdvmtzgd000104wgiubpx9ru')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);
