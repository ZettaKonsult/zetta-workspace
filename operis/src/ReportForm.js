import React, { Component } from 'react';

class ReportForm extends Component {

  constructor() {
    super()

    this.state = {
      form: {
        Date: new Date().toDateString(),
        Hours: "0",
        projectOptions: ""
      },
      projectOptions: [
        "A", "B", "Q"
      ]
    }
  }

  onChange = (event) => {
    const e = {...event}
    this.setState(this.updateForm(e))
  }

  onSubmit = (event) => {
    event.preventDefault()
    console.log(this.state.form)
  }

  addProject = (event) => {
    let newName = window.prompt(`Enter name of the new project:`, "Project name")

    this.setState(this.updateProjects(newName))
  }

  updateProjects = (newName) => (state, props) => ({
    ...state, projectOptions: [...state.projectOptions, newName]
  })

  updateForm = (event) => (state, props) => (
    {...state, form: {...state.form, [event.target.id]: event.target.value}}
  )

  render() {
    const {form, projectOptions} = this.state
    return (
      <form>
        <Input name='Date' onChange={this.onChange} value={form}/>
        <Input name='Hours' onChange={this.onChange}
        value={form}/>
        <Select name="projectOptions" options={projectOptions} onChange={this.onChange} value={form}/>
        <button type="button" onClick={this.addProject}>New Project</button>
      <br/>
        <button type="submit" onClick={this.onSubmit}>
          Save report
        </button>
      </form>
    )
  }

}

const Select = ({name, onChange, value, options}) =>
  <select id={name} onChange={onChange} value={value[name]}>
    {options.map((option) => <option key={option} value={option}>{option}</option>)}
  </select>


const Input = (props) => (
  <div>
    <label>
      {props.name}
    </label>
    <input id={props.name} onChange={props.onChange}     value={props.value[props.name]}/>
  </div>
  )

export default ReportForm
