import React from 'react';
import Calendar from '../../components/Calendar/';
import LoaderButton from '../../components/LoaderButton';
import InputField from '../../components/InputField';
import SelectField from '../../components/SelectField';

const Form = ({
  selectedDates,
  reservedDates,
  date,
  handleDate,
  handleChange,
  handleFormChange,
  handleSubmit,
  value,
  isLoading,
}) => (
  <form>
    <Calendar
      header
      weekdays
      selectedDates={selectedDates}
      reservedDates={reservedDates}
      select={handleDate}
      date={date}
    />

    <InputField
      type="text"
      id="email"
      placeholder="email"
      value={value.email}
      onChange={handleFormChange}
    />
    <InputField
      type="text"
      id="name"
      placeholder="name"
      value={value.name}
      onChange={handleFormChange}
    />
    <InputField
      type="text"
      id="phone"
      placeholder="Phone"
      value={value.phone}
      onChange={handleFormChange}
    />
    <SelectField id="paid" value={value.paid} onChange={handleFormChange}>
      <option value="false">Unpaid</option>
      <option value="true">Paid</option>
    </SelectField>
    <LoaderButton
      block
      bsStyle="primary"
      bsSize="large"
      type="submit"
      onClick={handleSubmit}
      isLoading={isLoading}
      text="Save"
      loadingText="Loading…"
      style={{ margin: '1em' }}
    />
  </form>
);

export default Form;
