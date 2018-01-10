import React, { Component } from 'react'

// import {
//   getUserAttributes,
//   updateUserAttributes
// } from "../../libs/awsAttributes"

import IsPaid from './IsPaid'
import IsNotPaid from './IsNotPaid'
import ContactInfo from './ContactInfo'
import ChangePassword from './ChangePassword'

import './style.css'

import PageNavigation from '../../components/PageNavigation'
import Message from '../../components/Message'

export default class MyPage extends Component {
  constructor(props) {
    super(props)
    this.pages = ['contact', 'changePassword']
    this.fields = [
      'ssn',
      'first name',
      'surname',
      'address',
      'city',
      'postcode',
      'mobile',
      'email'
    ]
    this.state = {
      loading: false,
      isPaid: false,
      isSuccess: false
    }
  }

  async componentWillMount() {
    this.fields.map(item => this.setState({ [item]: '' }))
    this.setInitalPage()
    try {
      // const result = await getUserAttributes()
      // result.map((item, i) => this.setState({[item.Name]: item.Value}))
    } catch (e) {
      console.log(e)
    }
  }

  setInitalPage = () => {
    const page = this.props.match.params.page || this.pages[0]
    this.setState({ page })
    this.props.history.push(`/mypage/${page}`)
  }

  changePage = page => {
    this.props.history.push(`/mypage/${page}`)
    this.setState({ page })
  }

  onChange = e => this.setState({ [e.target.id]: e.target.value })

  paymentHandler = () => this.setState({ isPaid: true })

  updateContactInfo = async e => {
    e.preventDefault()
    this.setState({ loading: true })
    const contactInfo = [{ Name: 'email', Value: this.state.email }]
    // await updateUserAttributes(contactInfo)
    this.setState({ loading: false, isSuccess: true })
  }

  render() {
    return (
      <div className="layout">
        <PageNavigation
          activeState={this.state.page}
          onClick={this.changePage}
          pages={this.pages}
          root="/mypage"
        />
        {this.state.page === 'contact' && (
          <ContactInfo
            fields={this.fields}
            values={this.state}
            onChange={this.onChange}
            submit={this.updateContactInfo}
            disabled={this.state.loading}
          />
        )}
        {this.state.page === 'changePassword' && (
          <ChangePassword
            onChange={this.onChange}
            submit={this.changePassword}
          />
        )}

        {this.state.isSuccess && (
          <Message mode="success">Edit Successfull</Message>
        )}
        {this.state.error && (
          <Message mode="danger">{this.state.error.message}</Message>
        )}

        {this.state.isPaid ? (
          <IsPaid getRecipt={this.download} />
        ) : (
          <IsNotPaid initiatePaymentProccess={this.paymentHandler} />
        )}
      </div>
    )
  }
}
