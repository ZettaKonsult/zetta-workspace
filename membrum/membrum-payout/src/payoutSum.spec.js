import { payoutSum } from './payoutSum';

describe('payoutSum', () => {
  it('retuns a map with the planId and amount earned', () => {
    let plans = [{ id: 'a', amount: 1 }, { id: 'b', amount: 2 }];
    let payoutMap = { a: 2, b: 3 };

    const result = payoutSum(plans, payoutMap);

    expect(result).toEqual({ a: 2, b: 6 });
  });
});
