/* @flow */
import type { Recipient } from 'types/Recipient';

export type InvoiceRow = {
  +id: string,
  +companyCustomerId: string,
  +recipientId: string,
  +createdAt: number,
  unit: number,
  price: number,
  description: string,
  itemStatus: 'pending' | 'billed',
};

export type InvoiceStatus = {
  +id: string,
  +createdAt: number,
  +paymentId: string,
  +stage:
    | 'refunded'
    | 'payout'
    | 'overdue'
    | 'canceled'
    | 'succeeded'
    | 'failed'
    | 'transferred'
    | 'pending',
  +transferred?: { from: string, to: string },
};

export type Invoice = {
  +id: string,
  +recipient: Recipient,
  +createdAt: number,
  +invoiceRows: InvoiceRow[],
  itemStatus: InvoiceStatus[],
};
