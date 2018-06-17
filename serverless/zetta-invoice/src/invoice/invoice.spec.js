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

  it('locked invoice can not be updated', () => {
    const invoice = createInvoice();

    const result = invoice
      .lockInvoice()
      .addInvoiceRow({ id: 1 })
      .getInvoiceRows();

    expect(result).toEqual([]);
  });

  it("invoices don't share instance", () => {
    const invoice = createInvoice();
    const invoice1 = createInvoice();

    const result = invoice.addInvoiceRow({ id: 1 }).getInvoiceRows();
    const result1 = invoice1.addInvoiceRow({ id: 2 }).getInvoiceRows();

    expect(result).toEqual([{ id: 1 }]);
    expect(result1).toEqual([{ id: 2 }]);
  });

  it('toJson() returns an pure object', () => {
    const invoice = createInvoice();

    const result = invoice
      .addInvoiceRow({ id: 1 })
      .lockInvoice()
      .toJson();

    expect(result).toMatchSnapshot({
      createdAt: expect.any(Number),
      status: [{ createdAt: expect.any(Number) }],
    });
  });

  it('creating invoice with old data does a shallow merge', () => {
    const oldInvoice = { id: 'oldId', invoiceRows: [{ id: 'row1' }] };

    const invoice = createInvoice({ invoice: oldInvoice })
      .create({
        invoiceRows: [{ id: 'row2' }],
      })
      .toJson();

    expect(invoice).toEqual({
      id: 'oldId',
      invoiceRows: [{ id: 'row2' }],
    });
  });

  it('recipients are added to invoice', () => {
    let invoice = createInvoice({ invoice: { recipients: [{ id: 'rec1' }] } });

    invoice = invoice.addRecipient({ id: 'rec2' });

    expect(invoice.toJson()).toEqual({
      recipients: [{ id: 'rec1' }, { id: 'rec2' }],
    });
  });

  it('send is added to status', () => {
    let invoice = createInvoice();

    invoice = invoice.send();

    expect(invoice.toJson().status).toMatchSnapshot([
      { createdAt: expect.any(Number) },
    ]);
  });
});
