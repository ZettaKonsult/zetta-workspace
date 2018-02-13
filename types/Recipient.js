/* @flow */
export type Recipient = {
  email: string,
  address?: string,
  city?: string,
  zipcode?: string,
  firstname: string,
  lastname: string,
  ssn?: string,
  company?: string,
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
