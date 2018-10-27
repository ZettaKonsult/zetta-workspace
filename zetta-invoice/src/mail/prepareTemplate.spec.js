import { convertTaxToPercentage } from './prepareTemplate';

describe('convertTaxToPercentage', () => {
  it('returns 25%', () => {
    const tax = '0.25';

    const result = convertTaxToPercentage(tax);

    expect(result).toEqual('25%');
  });

  it('returns 10%', () => {
    const tax = '0.1';

    const result = convertTaxToPercentage(tax);

    expect(result).toEqual('10%');
  });

  it('returns 1%', () => {
    const tax = '0.01';

    const result = convertTaxToPercentage(tax);

    expect(result).toEqual('1%');
  });
});
