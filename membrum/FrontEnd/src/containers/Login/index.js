import React, {Component} from 'react'
import {connect} from 'react-redux'
import LoginForm from './LoginForm'
import {loginUser} from '../../user/authenticationActions'

export default connect(undefined, {
  onSubmit: values => loginUser(values.username, values.password)
})(LoginForm)
