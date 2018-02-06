/* @flow */
import type { Payment, PaymentStatus } from 'types/Membrum';

import { incrementToNextLowerBound } from 'date-primitive-utils';
import db from './database';
import initSub from './subscription';

const dbPaymentStatus = db({ TableName: 'MembrumPaymentStatuses' });
const dbPayments = db({ TableName: 'MembrumPayments' });

export default (organisationId: string) => {
  const subscription = initSub(organisationId);

  const getUnpaidPlans = async (memberId: string) => {
    const plans = await subscription.get(memberId);
    const payments = await dbPayments.list({
      memberId,
    });

    const filteredPayments = getAllPaymentsForInterval(
      payments,
      plans,
      Date.now()
    );

    return filteredPayments;
  };

  const getPaidPlans = () => {};

  return { getUnpaidPlans, getPaidPlans };
};

export const getAllPaymentsForInterval = (
  payments: Payment[],
  plans: Plan[],
  date: number
) => {
  return payments.filter(payment => {
    const plan = plans.find(plan =>
      payment.specification.some(planId => planId === plan.id)
    );

    const validUntil = incrementToNextLowerBound(
      payment.createdAt,
      plan.intervalCount
    );
    return validUntil > date;
  });
};
