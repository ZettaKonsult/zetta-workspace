import React from 'react'
import { connect } from 'react-redux'
import { toISODateString } from 'date-primitive-utils'

import { getPayments, getPlanDetails } from './membershipReducer'

import MembershipForm from './MembershipForm'
import PaymentStatus from './PaymentStatus'

import './membership.css'

let Payments = ({ payments, getPlanDetails }) => (
  <div>
    Your payments
    {payments.map((payment, i) => (
      <p key={i}>
        {toISODateString(payment.date)}
        {payment.specification.map((plan, i) => (
          <span key={i}>{getPlanDetails(plan).name} </span>
        ))}
      </p>
    ))}
  </div>
)

const mapStateToProps = (state, props) => ({
  payments: getPayments(state.membershipReducer),
  getPlanDetails: getPlanDetails(state.membershipReducer)
})

Payments = connect(mapStateToProps)(Payments)

export default () => (
  <div>
    <MembershipForm />
    <PaymentStatus />
    <Payments />
  </div>
)