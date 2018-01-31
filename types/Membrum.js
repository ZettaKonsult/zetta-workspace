/* @flow */

export type Plan = {
  +id: string,
  +name: string,
  +amount: number,
  +interval: 'month' | 'year',
  +intervalCount: number,
  +labels: Array,
  +group: Array,
  +type: ?string,
};

export type Payment = {
  +id: string,
  +date: number,
  +specification: Plan[],
};

export type PaymentStatus = {
  +date: number,
  +paymentId: string,
  +status:
    | 'refunded'
    | 'payout'
    | 'succeeded'
    | 'failed'
    | 'transfered'
    | 'pending',
  +transfered?: { from: string, to: string },
};

export type Member = {
  id: string,
  subscription: string[],
  payment: string[],
};
