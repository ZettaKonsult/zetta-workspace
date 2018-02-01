/* @flow */
import type { PaymentStatus, Payment } from 'types/Membrum';

import payment from './mock/payment';
import status from './mock/paymentStatus';

const s = status();
const p = payment();

export const payout = (
  payments: Payment[] = p,
  paymentStatus: PaymentStatus[] = s
) =>
  payments.reduce((total, payment) => {
    let filteredStatus = paymentStatus.filter(
      status => status.paymentId === payment.id
    );
    let result = calcPayout(payment, filteredStatus);

    result.forEach(id => {
      let oldValue = total[id] ? total[id] : 0;
      total[id] = oldValue + 1;
    });
    return total;
  }, {});

export const calcPayout = (
  payment: Payment,
  paymentStatus: PaymentStatus[]
): string[] =>
  paymentStatus
    .sort((a, b) => a.date - b.date)
    .reduce((total, status: PaymentStatus, index, arr) => {
      switch (status.status) {
        case 'succeeded':
          return [...total, ...payment.specification];
        case 'transferred':
          let result = total.filter(
            paymentId => paymentId !== status.transferred.from
          );
          return [...result, status.transferred.to];
        case 'payout':
          if (index < arr.length - 1) {
            throw new Error(
              `${payment.id} have status changes after a payout id:${status.id}`
            );
          } else {
            return [];
          }
        default:
          return total;
      }
    }, []);
