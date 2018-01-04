import React, {Component} from 'react'

import config from '../../config'

import FadedLine from '../../components/FadedLine'

import './style.css'

export default class UploadMembers extends Component {
  constructor(props) {
    super(props)
    this.file = null

    this.state = {
      isLoading: false
    }
  }

  handleFileChange = event => {
    this.file = event.target.files[0]
  }

  handleSubmit = async event => {
    event.preventDefault()
    let registrationFile = this.file
    if (
      registrationFile &&
      registrationFile.size > config.MAX_ATTACHMENT_SIZE
    ) {
      alert('Please pick a file smaller than 5MB')
      return
    }

    this.setState({isLoading: true})

    try {
      console.log(registrationFile)
    } catch (e) {
      alert(e)
      this.setState({isLoading: false})
    }
  }

  render() {
    return (
      <div>
        <h1 className="PageTitle">Ladok Upload</h1>
        <FadedLine />
        <form>
          <input onChange={this.handleFileChange} type="file" />
          <button type="button" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}
