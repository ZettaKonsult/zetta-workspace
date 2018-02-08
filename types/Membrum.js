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
  +createdAt: number,
  updatedAt: number,
  updatedTo: ?string,
};

export type Payment = {
  +id: string,
  +memberId: string,
  +createdAt: number,
  +specification: string[],
  status: PaymentStatus[],
};

export type PaymentStatus = {
  +id: string,
  +createdAt: number,
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
  +id: string,
  +createdAt: number,
  subscription: string[],
  payment: string[],
};
