/* @flow */

import type { InvoiceRow } from 'types/Invoice';

export type Recipient = {
  email: string,
  address?: string,
  city?: string,
  zipcode?: string,
  firstName: string,
  lastName: string,
  ssn?: string,
  company?: string,
  reccuringPayments: InvoiceRow[],
};

export type CompanyCustomer = {
  id: string,
  firstName: string,
  lastName: string,
  address: string,
  zipcode: string,
  city: string,
  email: string,
  company: string,
  createdAt: string,
};
