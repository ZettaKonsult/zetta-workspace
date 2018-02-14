import payout from './payout';

import invoiceMock from '../../../fixtures/invoice';

describe('calcPayout', () => {
  it('returns nothing when invoice is pending', () => {
    const subject = [invoiceMock.pendingInvoice];

    const result = payout(subject);

    expect(result).toEqual({});
  });

  it('returns a map with {id:priceTotal} when invoice is paid', () => {
    const subject = [invoiceMock.succeededInvoice];

    const result = payout(subject);

    expect(result).toEqual({ i2ir1: 1 });
  });

  it('handles multiple invoiceRows', () => {
    const subject = [invoiceMock.multipleInvoiceRows];

    const result = payout(subject);

    expect(result).toEqual({ i3ir1: 1, i3ir2: 1 });
  });

  it('Returns id with total when there is both paid and refunded invoices', () => {
    const subject = [
      invoiceMock.succeededInvoice,
      invoiceMock.refundSucceededInvoice,
    ];

    const result = payout(subject);

    expect(result).toEqual({ i2ir1: 0 });
  });
});
