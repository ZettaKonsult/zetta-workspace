/* @flow */

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
