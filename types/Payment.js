/* @flow */

export type Payment = {
  +id: string,
  +memberId: string,
  +createdAt: number,
  +type: 'invoice' | 'card',
  +specification: string[],
  stage: PaymentStatus[],
};

export type PaymentStatus = {
  +id: string,
  +createdAt: number,
  +paymentId: string,
  +stage:
    | 'refunded'
    | 'payout'
    | 'succeeded'
    | 'failed'
    | 'transferred'
    | 'pending',
  +transferred?: { from: string, to: string },
};
