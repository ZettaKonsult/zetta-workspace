import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as actions from './Actions'
import ReportForm from './ReportForm'

import './Report.css'

class Report extends Component {
  constructor() {
    super()

    this.state = {
      form: {
        date: new Date().getTime(),
        hours: 0,
        projectId: '',
        driving: 0,
        extrawork: '',
        extrahours: 0
      },
      projects: []
    }
  }

  componentDidMount() {
    if (this.props.id !== '-1') {
      this.setState(actions.getReport(this.props.id))
    }
    this.setState(actions.getProjects)
  }

  onChange = e => {
    this.setState(actions.updateForm(e.target.id, e.target.value))
  }

  onDateChange = e => {
    this.setState(
      actions.updateForm(e.target.id, new Date(e.target.value).getTime())
    )
  }

  onSubmit = e => {
    e.preventDefault()
    actions.saveReport(this.state.form)
  }

  addProject = event => {
    let newName = window.prompt(
      `Enter name of the new project:`,
      'Project name'
    )
    this.setState(actions.updateProjects(newName))
  }

  render() {
    const { form, projects } = this.state
    return (
      <ReportForm
        onChange={this.onChange}
        onDateChange={this.onDateChange}
        onSubmit={this.onSubmit}
        addProject={this.addProject}
        form={form}
        projects={projects}
      />
    )
  }

  static PropTypes = {
    id: PropTypes.string
  }
  static defaultProps = {
    id: '1'
  }
}

export default Report
