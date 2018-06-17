import createInvoice from './invoice';

describe('invoice sum calculator', () => {
  it('returns the correct amounts for complete row', () => {
    const defaultTax = 0.1;
    const invoiceRows = [{ unit: 2, price: 550, describe: 'asd', tax: 0.25 }];
    const testInvoice = createInvoice({ invoice: { invoiceRows }, defaultTax });

    const result = testInvoice.getInvoiceTotal();

    expect(result).toMatchSnapshot();
  });

  it('uses default tax if no tax is given for row', () => {
    const defaultTax = 0.25;
    const invoiceRows = [{ unit: 2, price: 550, describe: 'asd' }];
    const testInvoice = createInvoice({ invoice: { invoiceRows }, defaultTax });

    const result = testInvoice.getInvoiceTotal();

    expect(result).toMatchSnapshot();
  });

  it('correctly summarizes multiple rows', () => {
    const defaultTax = 0.1;
    const invoiceRows = [
      { unit: 1, price: 550, describe: 'asd', tax: 0.25 },
      { unit: 1, price: 550, describe: 'asd', tax: 0.25 },
    ];
    const testInvoice = createInvoice({ invoice: { invoiceRows }, defaultTax });

    const result = testInvoice.getInvoiceTotal();

    expect(result).toMatchSnapshot();
  });
});

describe('invoicerows', () => {
  it('can add invoiceRows', () => {
    const invoice = createInvoice();

    const result = invoice
      .addInvoiceRow({ id: 1 })
      .addInvoiceRow({ id: 2 })
      .getInvoiceRows();

    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
  });
});
