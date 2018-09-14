import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';
import { Form, Button, Divider, List } from 'semantic-ui-react';

import validate from './InvoiceFormValidation';
import { TextArea } from '../../Components/Form/TextArea';
import { Input } from '../../Components/Form/Input';
import { Dropdown } from '../../Components/Form/Dropdown';

let renderInvoiceRow = ({
  fields,
  meta: { error, submitFailed },
  ...props
}) => (
  <React.Fragment>
    <Form.Group>
      <Button
        disabled={props.disabled}
        type="button"
        onClick={() => fields.push({})}
      >
        + Add row
      </Button>
    </Form.Group>
    {submitFailed && error && <span>{error}</span>}
    {fields.map((invoiceRow, index) => (
      <Form.Group widths="4" fluid unstackable key={index}>
        <Field
          name={`${invoiceRow}.unit`}
          disabled={props.disabled}
          component={Input}
          type="number"
          placeholder="Unit"
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
          component={Input}
          placeholder="Description"
        />
        <Field
          name={`${invoiceRow}.tax`}
          disabled={props.disabled}
          component={Input}
          placeholder="Tax"
        />
        <Button
          icon
          disabled={props.disabled}
          type="button"
          onClick={() => fields.remove(index)}
        >
          X
        </Button>
      </Form.Group>
    ))}
  </React.Fragment>
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
    <Button primary disabled={props.disabled} type="submit">
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
