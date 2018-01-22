import React from 'react'
import { Route } from 'react-router-dom'

import Column from '../components/Column'

import Profile from './ProfileForm'
import PaymentStatus from '../membership/PaymentStatus'

export default ({ match }) => (
  <Column>
    <Route path={`${match.path}/profile`} component={Profile} />
    <Route path={`${match.path}/profile`} component={PaymentStatus} />
  </Column>
)
