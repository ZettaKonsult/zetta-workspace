import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Form, Button, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import validate from './ReportFormValidation';
import { TextArea } from '../../Components/Form/TextArea';
import { Input } from '../../Components/Form/Input';
import { Dropdown } from '../../Components/Form/Dropdown';

let renderInvoiceRow = ({ fields, meta: { error, submitFailed } }) => (
  <ul style={{ listStyle: 'none' }}>
    <li>
      <Button type="button" onClick={() => fields.push({})}>
        + Add row
      </Button>
    </li>
    {submitFailed && error && <span>{error}</span>}
    {fields.map((invoiceRow, index) => (
      <li style={{ display: 'flex' }} key={index}>
        <Field
          name={`${invoiceRow}.hours`}
          component={Input}
          type="number"
          placeholder="Hours"
        />
        <Field
          name={`${invoiceRow}.price`}
          component={Input}
          type="number"
          placeholder="Price"
        />
        <Field
          name={`${invoiceRow}.description`}
          component={TextArea}
          placeholder="Description"
        />
        <Field
          name={`${invoiceRow}.tax`}
          component={Input}
          placeholder="tax rate"
        />
        <Button type="button" onClick={() => fields.remove(index)}>
          X
        </Button>
      </li>
    ))}
  </ul>
);

let ReportForm = props => (
  <Form autoComplete="off" onSubmit={props.handleSubmit}>
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
    <FieldArray name="invoiceRows" component={renderInvoiceRow} />
    <Divider />
    <Button type="submit">Save report</Button>
    <Button as={Link} to={`/report`} content="Cancel" />
  </Form>
);

ReportForm = reduxForm({ form: 'reportForm', validate })(ReportForm);

const mapStateToProps = (state, props) => {
  if (props.invoices.length === 0) {
    return {};
  } else if (props.id === '0') {
    return {
      initialValues: {
        createdAt: new Date().toISOString().split('T')[0],
      },
    };
  } else {
    const invoice = props.invoices.find(invoice => invoice.id === props.id);
    return {
      initialValues: {
        ...invoice,
        createdAt: new Date(invoice.createdAt).toISOString().split('T')[0],
      },
    };
  }
};

export default connect(mapStateToProps)(ReportForm);
