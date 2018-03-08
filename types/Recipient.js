/* @flow */

export type Recipient = {
  +id: string,
  +companyCustomerId: string,
  email: string,
  address?: string,
  city?: string,
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
  zipcode: string,
  city: string,
  email: string,
  company: string,
  createdAt: string,
};
