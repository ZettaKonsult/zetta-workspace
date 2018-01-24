import {
  membership,
  isSubscriptionPaid,
  getUnpaidPlans,
  getPlanOptions,
  getNextPaymentDate,
  getAllPaymentsForInterval,
} from './membershipReducer';

import { planLoadRequest } from './planActions';

import db from '../mocks/db.js';

import { membershipPay, membershipUpdatePlans } from './membershipActions';

describe('membershipReducer', () => {
  let storeState;
  beforeEach(() => {
    storeState = membership(undefined, {});
  });

  it('returns inititalState', () => {
    expect(storeState).toEqual(createState());
  });

  it('handles MEMBERSHIP_UPDATE_PLANS', () => {
    storeState = membership(storeState, membershipUpdatePlans([2, 3]));
    expect(storeState).toEqual(createState({ subscription: [2, 3] }));
    storeState = membership(storeState, membershipUpdatePlans([2, 3]));
    expect(storeState).toEqual(createState({ subscription: [2, 3] }));
  });

  it('should be true when a request is dispatched', () => {
    expect(membership(storeState, planLoadRequest()).isFetching).toBeTruthy();
  });

  describe('isSubscriptionPaid()', () => {
    const date = 1;
    let storeState;

    beforeEach(() => {
      storeState = createStateWithPlans();
    });

    it('base case no payments', () => {
      storeState = membership(storeState, membershipUpdatePlans(['1']));
      expect(isSubscriptionPaid(storeState, date)).toBeFalsy();
    });

    it('payment in valid interval', () => {
      storeState = membership(storeState, membershipUpdatePlans(['1']));
      storeState = membership(storeState, membershipPay(['1']));
      expect(isSubscriptionPaid(storeState, Date.now())).toBeTruthy();
    });

    it('should be valid even if a plan has been deleted', () => {
      storeState = membership(storeState, membershipUpdatePlans(['1', '2']));
      storeState = membership(storeState, membershipPay(['1', '2']));
      storeState = membership(storeState, membershipUpdatePlans(['1']));
      expect(isSubscriptionPaid(storeState, date)).toBeTruthy();
    });

    it('should not be valid if none paid plan is added', () => {
      storeState = membership(storeState, membershipUpdatePlans(['1']));
      storeState = membership(storeState, membershipPay(['1']));
      storeState = membership(storeState, membershipUpdatePlans(['2']));
      expect(isSubscriptionPaid(storeState, date)).toBeFalsy();
    });

    it('should be false if there is no subscription', () => {
      expect(isSubscriptionPaid(storeState, date)).toBeFalsy();
    });

    it.skip('should not be valid if a not paid dublicate plan is added', () => {
      storeState = membership(storeState, membershipUpdatePlans(['1', '2']));
      storeState = membership(storeState, membershipPay(['1', '2']));
      storeState = membership(
        storeState,
        membershipUpdatePlans(['1', '2', '2'])
      );
      expect(isSubscriptionPaid(storeState, date)).toBeFalsy();
    });
  });

  describe('getUnpaidPlans()', () => {
    const date = 1;
    let storeState;

    beforeEach(() => {
      storeState = createStateWithPlans();
    });

    it('returns all plans when nothing has been paid', () => {
      storeState = membership(storeState, membershipUpdatePlans(['1', '2']));
      expect(getUnpaidPlans(storeState)).toEqual(['1', '2']);
    });

    it('returns only the unpaid when there is a payment', () => {
      storeState = membership(storeState, membershipUpdatePlans(['1', '2']));
      storeState = membership(storeState, membershipPay(['1']));
      expect(getUnpaidPlans(storeState, date)).toEqual(['2']);
    });

    it('handles multiple payments during same interval', () => {
      storeState = membership(storeState, membershipUpdatePlans(['1', '2']));
      storeState = membership(storeState, membershipPay(['1']));
      storeState = membership(storeState, membershipPay(['2']));
      storeState = membership(
        storeState,
        membershipUpdatePlans(['1', '2', '3'])
      );
      expect(getUnpaidPlans(storeState, date)).toEqual(['3']);
    });

    it('handles multiple intervals', () => {
      let date = Date.UTC(new Date().getUTCFullYear() + 2);
      storeState = membership(storeState, membershipUpdatePlans(['1', '2']));
      storeState = membership(storeState, membershipPay(['1', '2']));
      expect(getUnpaidPlans(storeState, date)).toEqual(['1', '2']);
    });
  });

  describe('getNextPaymentDate()', () => {
    const date = Date.UTC(2018, 0, 1);
    const expected = Date.UTC(2018, 6, 1);
    let storeState;

    beforeEach(() => {
      storeState = createStateWithPlans();
    });

    it('returns todays date if Subscription is not paid', () => {
      storeState = membership(storeState, membershipUpdatePlans(['1', '2']));
      expect(getNextPaymentDate(storeState, date)).toEqual(date);
    });

    it('returns the next pay date incremented by paid month interval', () => {
      storeState = membership(storeState, membershipUpdatePlans(['1']));
      storeState = membership(storeState, membershipPay(['1']));
      expect(getNextPaymentDate(storeState, date)).toEqual(expected);
    });
  });

  describe('getAllPaymentsForInterval()', () => {
    const date = Date.UTC(2018, 0, 1);
    let storeState;

    beforeEach(() => {
      storeState = createStateWithPlans();
    });

    it('returns all payments that have been made during an interval', () => {
      storeState = membership(storeState, membershipUpdatePlans(['1']));
      storeState = membership(storeState, membershipPay(['1']));
      storeState = membership(storeState, membershipUpdatePlans(['1', '2']));
      storeState = membership(storeState, membershipPay(['2']));
      expect(getAllPaymentsForInterval(storeState, date)).toHaveLength(2);
    });
  });
});

const createState = state => ({
  subscription: [],
  plan: { allIds: [], byId: {} },
  payments: [],
  isFetching: false,
  ...state,
});

const createStateWithPlans = state => ({
  subscription: [],
  plan: {
    allIds: ['1', '2', '3'],
    byId: {
      '1': {
        id: '1',
        interval: 'month',
        intervalCount: 6,
      },
      '3': {
        id: '3',
        interval: 'month',
        intervalCount: 6,
      },
      '2': {
        id: '2',
        interval: 'month',
        intervalCount: 6,
      },
    },
  },
  payments: [],
  isFetching: false,
  ...state,
});
