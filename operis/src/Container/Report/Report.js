import React, { Component } from 'react';

import * as actions from './Actions'

import './Report.css'

class Report extends Component {

  constructor() {
    super()

    this.state = {
      form: {
        date: toISODateString(new Date()),
        project: "",
        
      },
      project: [
        "A", "B", "Q"
      ]
    }
  }

  onChange = (e) => {
    this.setState(actions.updateForm(e.target.id, e.target.value))
  }

  onSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.form)
  }

  addProject = (event) => {
    let newName = window.prompt(`Enter name of the new project:`, "Project name")

    this.setState(actions.updateProjects(newName))
  }

  

  render() {
    const {form, project} = this.state
    return (
      <form className='ReportForm'>
        <Input name='date' type='date' onChange={this.onChange} value={form}/>
        
        <Input name='hours' onChange={this.onChange}
        value={form} placeholder='Hours spent on project'/>
        
        <Select name="project" options={project} onChange={this.onChange} value={form}/>
        
        <button type="button" onClick={this.addProject}>New Project</button>
        <br/>
        
        <Input name='driving' onChange={this.onChange} value={form} placeholder='How far did you drive?'/>
        
        <div className='formGroup'>
          <label htmlFor='extrawork'>Extra Work</label>
          <textarea id='extrawork' placeholder='Did you do some extra work?'></textarea>
        </div>
        
        <Input name='Extra Hours' onChange={this.onChange}
        value={form} placeholder='Hours spent on extra work'/>
        
        <br/>
        
        <button type="submit" onClick={this.onSubmit}>
          Save report
        </button>
      </form>
    )
  }

}

const Select = ({name, onChange, value, options}) =>
<div className='formGroup'>
  <label htmlFor={name}>
    {name}
  </label>
  <select id={name} onChange={onChange} value={value[name]}>
    {options.map((option) => <option key={option} value={option}>{option}</option>)}
  </select>
</div>


const Input = (props) => (
  <div className='formGroup'>
    <label htmlFor={props.name}>
      {props.name}
    </label>
    <input id={props.name} type={props.type} onChange={props.onChange} value={props.value[props.name]} placeholder={props.placeholder}/>
  </div>
  )
  
function toISODateString(date) {
  const dateAndTime = date.toISOString().split('T')
  
  return dateAndTime[0]
}

export default Report
