import React from "react"

import Input from "../../components/Input"
import Button from "../../components/Button"
import Select from "../../components/Select"

const interval_values = ["day", "week", "month", "year"]

const CreatePlan = ({ onChange, onCancel, onSubmit, onDelete, plan }) => (
  <form className="InputGroup">
    <Input name="amount" label="Fee" onChange={onChange} value={plan.amount} />
    <Select
      name="interval"
      option={interval_values}
      onChange={onChange}
      value={plan.interval}
    />
    <Input
      name="intervalCount"
      label="Interval Length"
      onChange={onChange}
      value={plan.intervalCount}
    />
    <Input name="Description" onChange={onChange} />
    <Input name="name" label="name" onChange={onChange} value={plan.name} />
    <Input name="Charge Statement" onChange={onChange} />
    <Input name="Trail Length" onChange={onChange} />
    <Input name="group" label="Group" onChange={onChange} value={plan.group} />
    <div className="ButtonGroup">
      <Button onClick={onSubmit}>Submit</Button>
      <Button onClick={onCancel}>Cancel</Button>
      {plan.id && (
        <Button onClick={e => onDelete(plan.id)} type="danger">
          Delete Plan
        </Button>
      )}
    </div>
  </form>
)

export default CreatePlan
