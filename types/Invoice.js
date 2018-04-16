/* @flow */

import type { CompanyCustomer, Recipient } from 'types/Recipient';
import type { InvoiceStatus } from 'types/Event';

export type Plan = {
  +id: string,
  +createdAt: number,
  +companyCustomerId: string,
  recipientIds: Array<string>,
  price: number,
  description: string,
  interval: number,
  intervalCount: 'days' | 'month' | 'year' | 'once',
  labels: Array<string>,
  group: string,
  epochNextProcess: number,
};

export type PlanQuery = {};

export type InvoiceSpecification = {
  companyCustomer: string | CompanyCustomer,
  invoice: {
    id: number,
    createdAt: string,
    timeToPay: string,
  },
  discount: number,
  netTotal: number,
  taxTotal: number,
  total: number,
  recipient: Recipient,
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

export type LockedInvoice = {
  locked: true,
  +id: string,
  +createdAt: number,
  companyCustomerId: string,
  companyCustomer: CompanyCustomer,
  invoiceRows: Array<InvoiceRow>,
  recipients: Array<Recipient>,
  itemStatus: InvoiceStatus,
};

export type UnlockedInvoice = {
  locked: false,
  +id: string,
  +createdAt: number,
  companyCustomerId: string,
  invoiceRows: Array<InvoiceRow>,
  recipients: Array<string>,
  itemStatus: InvoiceStatus,
};

export type Invoice = LockedInvoice | UnlockedInvoice;
