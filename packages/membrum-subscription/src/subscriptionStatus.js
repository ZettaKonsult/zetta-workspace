/* @flow */
import type { Payment, PaymentStatus, Plan } from 'types/Membrum';

import { incrementToNextLowerBound } from 'date-primitive-utils';
import payout from 'membrum-payout';

import db from './database';
import initSub from './subscription';

const dbPaymentStatus = db({ TableName: 'MembrumPaymentStatuses' });
const dbPayments = db({ TableName: 'MembrumPayments' });

export default (organisationId: string) => {
  const dbSub = initSub(organisationId);

  const getUnpaidPlans = async (memberId: string) => {
    let subscriptionPromise = dbSub.get(memberId);
    let paymentPromise = dbPayments.list({ memberId });

    let { subscription, filteredPayments } = await Promise.all([
      subscriptionPromise,
      paymentPromise,
    ]).then(getAllPaymentPromise);

    return await Promise.all(getAllStatusPromise(filteredPayments))
      .then(mergeAllStatuses)
      .then(paymentStatuses =>
        getPaidPlanIds(filteredPayments, paymentStatuses)
      )
      .then(extractPayoutPlanIds)
      .then(planIds => filterUnpaidPlans(planIds, subscription));
  };

  let getAllPaymentPromise = ([subscription, payments]) => ({
    filteredPayments: getAllPaymentsForInterval(
      payments,
      subscription,
      Date.now()
    ),
    subscription,
  });

  let getAllStatusPromise = filteredPayments =>
    filteredPayments.map(
      async payment => await dbPaymentStatus.list({ paymentId: payment.id })
    );

  let mergeAllStatuses = (statusMatrix: Array<Array<PaymentStatus>>) =>
    statusMatrix.reduce((total, row) => [...total, ...row], []);

  let getPaidPlanIds = (payments, paymentStatus) =>
    payout.payout(payments, paymentStatus);

  let extractPayoutPlanIds = paidPlans => Object.keys(paidPlans);

  let filterUnpaidPlans = (paidPlanIds, subscription) =>
    subscription.filter(plan => !paidPlanIds.find(id => id === plan.id));

  return { getUnpaidPlans };
};

export const getUnpaidPlans = (
  payments: Payment[],
  subscription: Plan[],
  paymentStatus: PaymentStatus[],
  date: number
): Plan[] => {
  if (payments.length === 0) {
    return subscription;
  } else {
    const paidPlansMap = calcPayouts(payments, paymentStatus);
    const paidPlanIds = Object.keys(paidPlansMap);

    const result = subscription.filter(plan =>
      paidPlanIds.find(id => id === plan.id)
    );

    return result;
  }
};

export const getAllPaymentsForInterval = (
  payments: Payment[],
  plans: Plan[],
  date: number
) =>
  payments.filter(payment => {
    const plan = plans.find(plan =>
      payment.specification.some(planId => planId === plan.id)
    );

    const validUntil = incrementToNextLowerBound(
      payment.createdAt,
      plan.intervalCount
    );
    return validUntil > date;
  });
