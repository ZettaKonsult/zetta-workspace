/* @flow */
import type { Payment, PaymentStatus, Plan } from 'types/Membrum';

import { getUnpaidPlans, getPaymentsByInterval } from 'membrum-membership';
import { incrementToNextLowerBound } from 'date-primitive-utils';
import payout from 'membrum-payout';

import db from './database';
import initSub from './subscription';

const dbPaymentStatus = db({ TableName: 'MembrumPaymentStatuses' });
const dbPayments = db({ TableName: 'MembrumPayments' });

export default (organisationId: string) => {
  const dbSubscription = initSub(organisationId);

  const fetchUnpaidPlans = async (memberId: string) => {
    let subscriptionPromise = dbSubscription.get(memberId);
    let paymentsPromise = dbPayments.list({ memberId });

    let { subscription, filteredPayments } = await Promise.all([
      subscriptionPromise,
      paymentsPromise,
    ]).then(filterPayments);

    return await Promise.all(getAllStatusPromise(filteredPayments))
      .then(mergeAllStatuses)
      .then(statuses =>
        getUnpaidPlans(filteredPayments, subscription, statuses)
      );
  };

  let filterPayments = ([subscription, payments]) => ({
    filteredPayments: getPaymentsByInterval(payments, subscription, Date.now()),
    subscription,
  });

  let getAllStatusPromise = filteredPayments =>
    filteredPayments.map(payment =>
      dbPaymentStatus.list({ paymentId: payment.id })
    );

  let mergeAllStatuses = (statusMatrix: Array<Array<PaymentStatus>>) =>
    statusMatrix.reduce((total, row) => [...total, ...row], []);

  return { fetchUnpaidPlans };
};
