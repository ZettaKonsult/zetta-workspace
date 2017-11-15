import React from "react"

import Button from "../../components/Button"

export default ({ initiatePaymentProccess }) => (
  <div className="paymentStatus unknownPayment">
    <h3>Payment status</h3>

    <p>We have no registered payment for this semester</p>

    <div className="ButtonGroup">
      <Button large onClick={initiatePaymentProccess}>
        Pay semester fee
      </Button>
    </div>
  </div>
)
