import Price from './price';

describe('invoice sum calculator', () => {
  it('returns the correct amounts for complete row', () => {
    const invoiceRows = [{ unit: 2, price: 550, describe: 'asd', tax: 0.25 }];

    const result = Price({ invoiceRows, defaultTax: 0.1 });

    expect(result).toMatchSnapshot();
  });

  it('uses default tax if no tax is given for row', () => {
    const invoiceRows = [{ unit: 2, price: 550, describe: 'asd' }];

    const result = Price({ invoiceRows, defaultTax: 0.25 });

    expect(result).toMatchSnapshot();
  });

  it('correctly summarizes multiple rows', () => {
    const invoiceRows = [
      { unit: 1, price: 550, describe: 'asd', tax: 0.25 },
      { unit: 1, price: 550, describe: 'asd', tax: 0.25 },
    ];

    const result = Price({ invoiceRows, defaultTax: 0.1 });

    expect(result).toMatchSnapshot();
  });
});
