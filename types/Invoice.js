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
  epochNextProcess: number,
};

export type PlanQuery = {};

export type InvoiceSpecification = {
  companyCustomer: string | CompanyCustomer,
  recipient: Recipient,
  invoice: {
    id: number,
    createdAt: string,
    timeToPay: string,
  },
  discount: number,
  netTotal: number,
  taxTotal: number,
  total: number,
  receiver: string,
};

export type InvoiceRow = {
  price: number,
  unit: number,
  tax: number,
  description: string,
};

export type InvoiceData = {
  id?: string,
  companyCustomerId: string,
  recipientIds: Array<string>,
  invoiceRows: Array<InvoiceRow>,
};

export type CalculatedInvoiceRow = InvoiceRow & {
  total: number,
};

export type Invoice = {
  +id: string,
  +createdAt: number,
  companyCustomer: string | CompanyCustomer,
  invoiceRows: InvoiceRow[],
  recipients: Array<string> | Array<Recipient>,
  itemStatus: InvoiceStatus,
  locked: boolean,
};
