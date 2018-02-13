/* @flow */
import type { SubscriptionStatus } from 'types/Plan';

export type Recipient = {
  email: string,
  address?: string,
  city?: string,
  zipcode?: string,
  firstname: string,
  lastname: string,
  ssn?: string,
  company?: string,
  subscription: SubscriptionStatus[],
};

export type CompanyCustomer = {
  id: string,
  name: string,
  address: string,
  zipcode: string,
  city: string,
  email: string,
  createdAt: string,
};
