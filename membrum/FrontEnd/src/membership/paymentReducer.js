/* @flow */
import type { Payment, PaymentStatus } from 'types/Membrum';
import type { Action } from 'types/Redux';

import { MEMBERSHIP_PAY, MEMBERSHIP_UPGRADE_TRAIL } from './membershipActions';

type PaymentState = {
  paymentById: { [payment_id: string]: Payment },
  paymentAllIds: string[],
  paymentStatusById: { [paymentStatus_id: string]: PaymentStatus },
};

const initialState = {
  paymentById: {},
  paymentAllIds: [],
  paymentStatusById: {},
  paymentStatusAllIds: [],
};

export const paymentReducer = (
  state: PaymentState = initialState,
  action: Action
) => {
  switch (action.type) {
    case MEMBERSHIP_PAY:
      return {
        ...state,
      };

    case MEMBERSHIP_UPGRADE_TRAIL:
    default:
      return state;
  }
};
