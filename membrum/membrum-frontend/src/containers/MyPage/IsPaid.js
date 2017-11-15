import React from "react"

import Button from "../../components/Button"

export default ({ getRecipt, getMembershipVerification }) => (
  <div className="paymentStatus approvedPayment">
    <h3>Payment status</h3>

    <p>Your fee has been payed for the current semester</p>

    <div className="ButtonGroup">
      <Button large onClick={getRecipt}>
        Get Reciet
      </Button>
      <Button large onClick={getMembershipVerification}>
        Get Membership Verification
      </Button>
    </div>
  </div>
)
