import React from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'

const ContactInfo = ({ fields, values, onChange, submit, disabled }) => (
  <div className="contactInfo">
    {fields.map((item, i) => (
      <Input key={i} name={item} value={values[item]} onChange={onChange} />
    ))}

    <Button large onClick={submit} disabled={disabled}>
      Submit
    </Button>
  </div>
)

export default ContactInfo
