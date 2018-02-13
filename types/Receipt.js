/* @flow */
import type { SubscriptionStatus } from 'types/Plan';

export type Receipt = {
  id: string,
  invoiceId: string,
  price: number,
  currency: string,
  provider: 'dibs' | 'manual',
  subscription: SubscriptionStatus[],
  createdAt: number,
};
