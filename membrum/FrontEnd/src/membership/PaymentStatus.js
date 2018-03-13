import React from 'react';
import { connect } from 'react-redux';
import { toISODateString } from 'date-primitive-utils';

import { isSubscriptionPaid, getNextPayment } from './membershipReducer';
import { membershipPay } from './membershipActions';
import { getUserData } from '../user/';

import Button from '../components/Button';

const style = isPaid => ({
  display: 'flex',
  flexDirection: 'column',
  border: '1px dotted grey',
  margin: '1em',
  padding: '1em',
  background: `${isPaid ? 'var(--success-light)' : 'var(--danger-light)'}`,
});

const PaymentStatus = ({ membershipPay, paid, nextPayment }) => {
  return paid ? (
    <Paid nextPaymentDate={nextPayment.date} />
  ) : (
    <Unpaid paymentProccess={membershipPay} nextPayment={nextPayment} />
  );
};

const Unpaid = ({ userId, paymentProccess, nextPayment }) => (
  <div style={style(false)}>
    <h3>Payment status</h3>

    <p>There is a unpaid plan for this semester</p>
    <p>Current subscription is</p>
    {nextPayment.subscription.map((plan, i) => (
      <span key={`${plan.id}${i}`}>{plan.name}</span>
    ))}
    <p>Total cost {nextPayment.amount}</p>
    <div className="ButtonGroup">
      <Button
        large
        onClick={() =>
          paymentProccess(nextPayment.subscription.map(plan => plan.id))
        }
      >
        Pay semester fee
      </Button>
    </div>
  </div>
);

const Paid = ({ getRecipt, getMembershipVerification, nextPaymentDate }) => (
  <div style={style(true)}>
    <h3>Payment status</h3>

    <p>Your fee has been payed for the current semester</p>
    <p>
      Next payment date is due:
      {toISODateString(nextPaymentDate)}
    </p>

    <div className="ButtonGroup">
      <Button large onClick={() => console.log('TODO')}>
        Get receipt
      </Button>
      <Button large onClick={() => console.log('TODO')}>
        Get Membership Verification
      </Button>
    </div>
  </div>
);

const mapStateToProps = (state, props) => {
  const date = Date.now();
  return {
    paid: isSubscriptionPaid(state.membershipReducer, date),
    nextPayment: getNextPayment(state.membershipReducer, date),
    userId: getUserData(state.userReducer),
  };
};

export default connect(mapStateToProps, {
  membershipPay: plans => membershipPay('910504-0035', plans),
})(PaymentStatus);
