/* @flow */
export type SubscriptionStatus = {
  type: 'subscribe' | 'unsubscribe',
  recipientId: string,
  createdAt: number,
};

export type Plan = {
  +id: string,
  +companyCustomerId: string,
  +name: string,
  +price: number,
  +interval: 'month' | 'year',
  +intervalCount: number,
  +labels: string[],
  +group: string[],
  +createdAt: number,
  description: string,
  subscribers: SubscriptionStatus[],
};
