/* @flow */
import type { ThunkAction, Action, Plan } from '../types';

import { getPlanById } from './membershipReducer';

export const MEMBERSHIP_UPDATE_PLANS = 'MEMBERSHIP_UPDATE_PLANS';
export const MEMBERSHIP_PAY = 'MEMBERSHIP_PAY';

export const membershipUpdatePlans = (plans: Plan[]): Action => ({
  type: MEMBERSHIP_UPDATE_PLANS,
  payload: {
    plans,
  },
});

export const membershipPay = (plans: Plan[]): Action => {
  const date = Date.now();
  return {
    type: MEMBERSHIP_PAY,
    payload: {
      date,
      specification: plans,
    },
  };
};

export const membershipSave = (plans: Plan[]): ThunkAction => (
  dispatch,
  getState
) => {
  const { membershipReducer } = getState();
  const result = plans.filter(
    plan => getPlanById(membershipReducer, plan).type !== 'default'
  );

  dispatch(membershipUpdatePlans(result));
};
