/* @flow */
import type { Recipient } from 'types/Recipient';
import type { InvoiceStatus } from 'types/Event';

export type Plan = {
  +id: string,
  +createdAt: number,
  companyCustomerId: string,
  recipientIds: string[],
  price: number,
  description: string,
  interval: number,
  intervalCount: 'days' | 'month' | 'year' | 'once',
  labels: string[],
  group: string,
  epochLastProcessed: number,
};

export type InvoiceRow = {
  price: number,
  hours: number,
  tax: number,
  description: string,
};

export type Invoice = {
  +id: string,
  +createdAt: number,
  +recipient: Recipient,
  +invoiceRows: InvoiceRow[],
  itemStatus: InvoiceStatus,
};
