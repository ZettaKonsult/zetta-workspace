/* @flow */

export type Plan = {
  +id: string,
  +name: string,
  +amount: number,
  +interval: 'month' | 'year',
  +intervalCount: number,
  +labels: string[],
  +group: string[],
  +type: ?string,
  +updated: ?string,
};

export type Payment = {
  +id: string,
  +date: number,
  +specification: string[],
};

export type PaymentStatus = {
  +id: string,
  +date: number,
  +paymentId: string,
  +status:
    | 'refunded'
    | 'payout'
    | 'succeeded'
    | 'failed'
    | 'transferred'
    | 'pending',
  +transferred?: { from: string, to: string },
};

export type Member = {
  id: string,
  subscription: string[],
  payment: string[],
};
