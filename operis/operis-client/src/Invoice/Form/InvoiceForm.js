import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Form, Button, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import validate from './InvoiceFormValidation';
import { TextArea } from '../../Components/Form/TextArea';
import { Input } from '../../Components/Form/Input';
import { Dropdown } from '../../Components/Form/Dropdown';

let renderInvoiceRow = ({
  fields,
  meta: { error, submitFailed },
  ...props
}) => (
  <ul style={{ listStyle: 'none' }}>
    <li>
      <Button
        disabled={props.disabled}
        type="button"
        onClick={() => fields.push({})}
      >
        + Add row
      </Button>
    </li>
    {submitFailed && error && <span>{error}</span>}
    {fields.map((invoiceRow, index) => (
      <li style={{ display: 'flex' }} key={index}>
        <Field
          name={`${invoiceRow}.unit`}
          disabled={props.disabled}
          component={Input}
          type="number"
          placeholder="unit"
        />
        <Field
          name={`${invoiceRow}.price`}
          disabled={props.disabled}
          component={Input}
          type="number"
          placeholder="Price"
        />
        <Field
          name={`${invoiceRow}.description`}
          disabled={props.disabled}
          component={TextArea}
          placeholder="Description"
        />
        <Field
          name={`${invoiceRow}.tax`}
          disabled={props.disabled}
          component={Input}
          placeholder="tax rate"
        />
        <Button
          disabled={props.disabled}
          type="button"
          onClick={() => fields.remove(index)}
        >
          X
        </Button>
      </li>
    ))}
  </ul>
);

let ReportForm = props => (
  <Form autoComplete="off" onSubmit={props.handleSubmit}>
    <Field
      name="createdAt"
      disabled={props.disabled}
      component={Input}
      type="date"
      placeholder="Date"
    />
    <Field
      name="recipientIds"
      disabled={props.disabled}
      component={Dropdown}
      placeholder="Recipient"
      options={props.recipients.map(recipient => ({
        key: recipient.id,
        value: recipient.id,
        text: `${recipient.firstName} ${recipient.lastName}`,
      }))}
    />
    <FieldArray
      disabled={props.disabled}
      name="invoiceRows"
      component={renderInvoiceRow}
    />
    <Divider />
    <Button disabled={props.disabled} type="submit">
      Save report
    </Button>
    <Button as={Link} to={`/report`} content="Cancel" />
  </Form>
);

ReportForm = reduxForm({ form: 'reportForm', validate })(ReportForm);

const mapStateToProps = (state, props) => {
  const invoice = props.invoices.find(invoice => invoice.id === props.id);
  if (invoice) {
    const recipient = props.recipients.find(
      recipient => recipient.id === invoice.recipientIds[0]
    );
    console.log(props.recipients);
    return {
      disabled: invoice.locked,
      initialValues: {
        ...invoice,
        recipientIds: recipient.id,
        createdAt: new Date(invoice.createdAt).toISOString().split('T')[0],
      },
    };
  } else {
    return {
      disabled: false,
      initialValues: {
        createdAt: new Date().toISOString().split('T')[0],
      },
    };
  }
};

export default connect(mapStateToProps)(ReportForm);
