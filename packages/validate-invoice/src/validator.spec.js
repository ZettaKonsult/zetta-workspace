import validator from './validator';

import invoiceMock from '../../../fixtures/invoice';

describe('calcPayout', () => {
  it('returns false if invoiceRows have different recipients', () => {
    const subject = invoiceMock.invalidInvoiceRows.invoiceRows;

    const result = validator(subject);

    expect(result).toBeFalsy();
  });

  it('returns true if invoiceRows have same recipients', () => {
    const subject = invoiceMock.multipleInvoiceRows.invoiceRows;

    const result = validator(subject);

    expect(result).toBeTruthy();
  });
});
