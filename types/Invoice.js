/* @flow */
import type { CompanyCustomer, Recipient } from 'types/Recipient';
import type { InvoiceStatus } from 'types/Event';

export type Plan = {
  +id: string,
  +createdAt: number,
  +companyCustomerId: string,
  recipientIds: string[],
  price: number,
  description: string,
  interval: number,
  intervalCount: 'days' | 'month' | 'year' | 'once',
  labels: string[],
  group: string,
  epochLastProcessed: number,
};

export type InvoiceData = {
  id?: string,
  recipientIds: Array<string>,
  companyCustomerId: string,
};

export type Invoice = {
  +id: string,
  +createdAt: number,
  recipients: Array<string> | Array<Recipient>,
  companyCustomer: string | CompanyCustomer,
  itemStatus: InvoiceStatus,
  locked: boolean,
};
