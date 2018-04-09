/* @flow */

export type Recipient = {
  +id: string,
  +companyCustomerId: string,
  email: string,
  address?: string,
  city?: string,
  mobile?: string,
  zipcode?: string,
  firstName: string,
  lastName: string,
  ssn?: string,
  company?: string,
  mobile?: string,
};

export type CompanyCustomer = {
  id: string,
  firstName: string,
  lastName: string,
  address: string,
  company: string,
  city: string,
  email: string,
  mobile: string,
  zipcode: string,
  createdAt: string,
  VAT: string,
  defaultTax: number,
  bank: {
    giro: string,
    name: string,
  },
};
