/* @flow */
import { getPlanById } from './membershipReducer';

import type { ThunkAction, Action } from '../reducers';

export const MEMBERSHIP_UPDATE_PLANS = 'MEMBERSHIP_UPDATE_PLANS';
export const MEMBERSHIP_PAY = 'MEMBERSHIP_PAY';

export const membershipUpdatePlans = (plans): Action => ({
  type: MEMBERSHIP_UPDATE_PLANS,
  payload: {
    plans,
  },
});

export const membershipPay = (plans): Action => {
  const date = Date.now();
  return {
    type: MEMBERSHIP_PAY,
    payload: {
      date,
      specification: plans,
    },
  };
};

export const membershipSave = (plans): ThunkAction => (dispatch, getState) => {
  const { membershipReducer } = getState();
  const result = plans.filter(
    plan => getPlanById(membershipReducer, plan).type !== 'default'
  );

  dispatch(membershipUpdatePlans(result));
};
