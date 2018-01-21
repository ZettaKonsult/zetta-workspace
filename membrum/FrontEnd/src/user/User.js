import React from 'react'
import { Route } from 'react-router-dom'

import Profile from './ProfileForm'
import PaymentStatus from '../membership/PaymentStatus'

export default ({ match }) => (
  <div>
    <Route path={`${match.path}/profile`} component={Profile} />
    <Route path={`${match.path}/profile`} component={PaymentStatus} />
  </div>
)
