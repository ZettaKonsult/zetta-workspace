import React, { Component } from 'react'

import config from '../../config'
import ChangeWindow from './ChangeWindow'

import FadedLine from '../../components/FadedLine'
import Button from '../../components/Button'

import './style.css'

export default class UploadMembers extends Component {
  constructor(props) {
    super(props)
    this.file = null

    this.state = {
      isLoading: false,
      fileContent: null
    }
  }

  handleFileChange = event => {
    this.file = event.target.files[0]
    this.setState({ fileContent: true })
  }

  handleSubmit = async event => {
    event.preventDefault()

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert('Please pick a file smaller than 5MB')
      return
    }

    this.setState({ isLoading: true })
  }

  render() {
    return (
      <div>
        <h1 className="PageTitle">Ladok Upload</h1>
        <FadedLine />
        <div className="LadokUpload">
          <input onChange={this.handleFileChange} type="file" />
          {this.state.fileContent && (
            <div>
              <ChangeWindow title="New Members">
                <span>YYMMDD-XXXX -> TLTH</span>
                <span>YYMMDD-XXXX -> JF</span>
                <span>YYMMDD-XXXX -> MF</span>
              </ChangeWindow>
              <ChangeWindow title="Changed Members">
                <span>YYMMDD-XXXX TLTH -> HUM</span>
                <span>YYMMDD-XXXX JF -> SKFM</span>
                <span>YYMMDD-XXXX MF -> LE</span>
              </ChangeWindow>
              <ChangeWindow title="Rejected Rows">
                <span>YYMMDD-XXXX</span>
                <span>YYMMDD-XXXX</span>
                <span>YYMMDD-XXXX</span>
                <span>YYMMDD-XXXX</span>
              </ChangeWindow>
              <Button large>Accept All</Button>
            </div>
          )}
        </div>
      </div>
    )
  }
}
