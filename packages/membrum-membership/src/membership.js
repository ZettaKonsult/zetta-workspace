/* @flow */
import type { Payment, PaymentStatus, Plan } from 'types/Membrum';

import payout from 'membrum-payout';
import { incrementToNextLowerBound } from 'date-primitive-utils';

export const getUnpaidPlans = (
  payments: Payment[],
  subscription: Plan[],
  paymentStatus: PaymentStatus[]
): Plan[] => {
  if (payments.length === 0) {
    return subscription;
  } else {
    const paidPlansMap = payout.payout(payments, paymentStatus);
    const paidPlanIds = Object.keys(paidPlansMap);

    const result = subscription.filter(
      plan => !paidPlanIds.find(id => id === plan.id)
    );

    return result;
  }
};

export const getPaymentsByInterval = (
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
