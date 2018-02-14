/* @flow */

export type InvoiceStatus = {
  +id: string,
  +invoiceId: string,
  +createdAt: number,
  +itemStatus: 'pending' | 'canceled' | 'succeeded',
};

export type SubscriptionStatus = {
  type: 'subscribe' | 'unsubscribe',
  recipientId: string,
  createdAt: number,
};
