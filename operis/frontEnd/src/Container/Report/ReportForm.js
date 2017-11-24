import React from 'react'

const ReportForm = ({
  form,
  projects,
  addProject,
  onChange,
  onDateChange,
  onSubmit
}) => (
  <form className="ReportForm">
    <Input
      name="date"
      type="date"
      onChange={onDateChange}
      value={toISODateString(new Date(form.date))}
    />

    <Input
      name="hours"
      type="number"
      onChange={onChange}
      value={form.hours}
      placeholder="Hours spent on project"
    />

    <Select
      name="project"
      options={projects.reduce(
        (result, project) => [...result, project.name],
        []
      )}
      onChange={onChange}
      value={form.projectId}
    />

    <button type="button" onClick={addProject}>
      New Project
    </button>
    <br />

    <Input
      name="driving"
      type="number"
      onChange={onChange}
      value={form.driving}
      placeholder="How far did you drive?"
    />

    <div className="formGroup">
      <label htmlFor="extrawork">Extra Work</label>
      <textarea
        id="extrawork"
        placeholder="Did you do some extra work?"
        onChange={onChange}
        value={form.extrawork}
      />
    </div>

    <Input
      name="Extra Hours"
      type="number"
      onChange={onChange}
      value={form.extrahours}
      placeholder="Hours spent on extra work"
    />

    <br />

    <button type="submit" onClick={onSubmit}>
      Save report
    </button>
  </form>
)

const Select = ({ name, onChange, value, options }) => (
  <div className="formGroup">
    <label htmlFor={name}>{name}</label>
    <select id={name} onChange={onChange} value={value}>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
)

const Input = ({ name, type, onChange, value, placeholder }) => (
  <div className="formGroup">
    <label htmlFor={name}>{name}</label>
    <input
      id={name}
      type={type}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  </div>
)

function toISODateString(date) {
  const dateAndTime = date.toISOString().split('T')

  return dateAndTime[0]
}

export default ReportForm
