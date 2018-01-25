/* @flow */
import type { ThunkAction, Action, Plan } from '../types';

import { getPlanById } from './membershipReducer';

export const MEMBERSHIP_UPDATE_PLANS = 'MEMBERSHIP_UPDATE_PLANS';
export const MEMBERSHIP_PAY = 'MEMBERSHIP_PAY';
export const MEMBERSHIP_UPGRADE_TRAIL = 'MEMBERSHIP_UPGRADE_TRAIL';

export const membershipUpdatePlans = (plans: string[]): Action => ({
  type: MEMBERSHIP_UPDATE_PLANS,
  payload: {
    plans,
  },
});

export const membershipPay = (plans: string[]): Action => {
  const date = Date.now();
  return {
    type: MEMBERSHIP_PAY,
    payload: {
      date,
      specification: plans,
    },
  };
};

export const membershipSave = (plans: string[]): ThunkAction => (
  dispatch,
  getState
) => {
  const { membershipReducer } = getState();
  const result = plans.filter(
    planId => getPlanById(membershipReducer, planId).type !== 'default'
  );

  dispatch(membershipUpdatePlans(result));
};

export const membershipUpgradeTrail = (planId: string) => ({
  type: MEMBERSHIP_UPGRADE_TRAIL,
  payload: { planId },
});
