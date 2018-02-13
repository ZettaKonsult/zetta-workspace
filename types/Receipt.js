/* @flow */

export type Receipt = {
  id: string,
  invoiceId: string,
  price: number,
  currency: string,
  provider: 'dibs' | 'manual',
  createdAt: number,
};
