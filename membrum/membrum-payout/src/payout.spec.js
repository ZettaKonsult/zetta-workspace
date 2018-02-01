import * as payout from './payout';

describe('calcPayout', () => {
  it('removes old id and adds new on transferred', () => {
    let payment = { id: 'a', specification: ['x'] };
    let status = [
      { id: 1, paymentId: 'a', date: Date.now() + 1, status: 'succeeded' },
      {
        id: 2,
        paymentId: 'a',
        date: Date.now() + 2,
        status: 'transferred',
        transferred: { from: 'x', to: 'z' },
      },
    ];

    const result = payout.calcPayout(payment, status);

    expect(result).toEqual(['z']);
  });

  it('adds specification ids to result on succeeded', () => {
    let payment = { id: 'a', specification: ['x'] };
    let status = [
      { id: 1, paymentId: 'a', date: Date.now() + 1, status: 'succeeded' },
    ];

    const result = payout.calcPayout(payment, status);

    expect(result).toEqual(['x']);
  });

  it('if there exists status changes after a payout it should throw an error', () => {
    let payment = { id: 'a', specification: ['x'] };
    let status = [
      { id: 1, paymentId: 'a', date: Date.now() + 1, status: 'succeeded' },
      { id: 2, paymentId: 'a', date: Date.now() + 2, status: 'payout' },
      { id: 3, paymentId: 'a', date: Date.now() + 3, status: 'succeeded' },
    ];

    function result() {
      payout.calcPayout(payment, status);
    }

    expect(result).toThrowErrorMatchingSnapshot();
  });
});

describe('payout', () => {
  it('returns total for all payments', () => {
    let payment = [
      { id: 'a', specification: ['x', 'z'] },
      { id: 'b', specification: ['y', 'x'] },
    ];
    let status = [
      { id: 1, paymentId: 'a', date: Date.now() + 1, status: 'succeeded' },
      { id: 2, paymentId: 'b', date: Date.now() + 2, status: 'succeeded' },
    ];

    const result = payout.payout(payment, status);

    expect(result).toEqual({
      x: 2,
      y: 1,
      z: 1,
    });
  });
});
