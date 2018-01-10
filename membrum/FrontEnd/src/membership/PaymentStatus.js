import React from 'react'
import { connect } from 'react-redux'
import {
  isSubscriptionPaid,
  getNextPayment,
  getPlanDetails
} from './membershipReducer'
import { membershipPay } from './membershipActions'

import { toISODateString } from 'date-primitive-utils'

import Button from '../components/Button'

const style = {
  display: 'flex',
  flexDirection: 'column',
  border: '1px dotted grey',
  margin: '1em',
  padding: '1em',
  background: 'var(--danger-light)'
}

const PaymentStatus = ({
  membershipPay,
  paid,
  nextPayment,
  getPlanDetails
}) => {
  return paid ? (
    <Paid nextPaymentDate={nextPayment.date} />
  ) : (
    <Unpaid
      paymentProccess={membershipPay}
      nextPayment={nextPayment}
      getPlanDetails={getPlanDetails}
    />
  )
}

const Unpaid = ({ paymentProccess, nextPayment, getPlanDetails }) => (
  <div style={style}>
    <h3>Payment status</h3>

    <p>There is a unpaid plan for this semester</p>
    <p>Current subscription is</p>
    {nextPayment.plans.map(plan => (
      <span key={getPlanDetails(plan).id}>{getPlanDetails(plan).name}</span>
    ))}
    <p>Total cost {nextPayment.amount}</p>
    <div className="ButtonGroup">
      <Button large onClick={() => paymentProccess(nextPayment.plans)}>
        Pay semester fee
      </Button>
    </div>
  </div>
)

const Paid = ({ getRecipt, getMembershipVerification, nextPaymentDate }) => (
  <div className="paymentStatus approvedPayment">
    <h3>Payment status</h3>

    <p>Your fee has been payed for the current semester</p>
    <p>
      Next payment date is due:
      {toISODateString(nextPaymentDate)}
    </p>

    <div className="ButtonGroup">
      <Button large onClick={getRecipt}>
        Get receipt
      </Button>
      <Button large onClick={getMembershipVerification}>
        Get Membership Verification
      </Button>
    </div>
  </div>
)

const mapStateToProps = (state, props) => {
  return {
    paid: isSubscriptionPaid(state.membershipReducer, Date.UTC(2018, 1, 1)),
    nextPayment: getNextPayment(state.membershipReducer),
    getPlanDetails: plan => getPlanDetails(state.membershipReducer)(plan)
  }
}

export default connect(mapStateToProps, {
  membershipPay: plans => membershipPay(plans)
})(PaymentStatus)
