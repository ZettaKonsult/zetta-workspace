import { getUnpaidPlans, getPaymentsByInterval } from './membership';
import mockPayments from './mock/payment';
import mockPlans from './mock/plans';
import paymentStatus from './mock/paymentStatus';

describe('getUnpaidPlans()', () => {
  it('returns the plans in subscription with no payment attached to it', () => {
    let payment = mockPayments.filter(p => p.id === '2');
    let subscription = [{ id: '1' }, { id: '2' }, { id: '3' }];
    let status = paymentStatus.filter(s => s.paymentId === '2');

    const result = getUnpaidPlans(payment, subscription, status);

    expect(result).toEqual([{ id: '3' }]);
  });
});

describe('getPaymentsByInterval()', () => {
  it('returns the payments done during the specified interval', () => {
    let payment = mockPayments;
    let plans = mockPlans;
    let date = Date.UTC(2018, 4, 1);

    const result = getPaymentsByInterval(payment, plans, date);

    expect(result).toEqual([
      {
        id: '1',
        memberId: 'm',
        createdAt: Date.UTC(2018, 5, 5),
        specification: ['1', '2', '3', '4'],
      },
      {
        id: '2',
        memberId: 'm2',
        createdAt: Date.UTC(2018, 2, 5),
        specification: ['1', '2'],
      },
    ]);
  });
});
