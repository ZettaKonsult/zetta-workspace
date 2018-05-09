/* @flow */

import type { CompanyCustomer } from 'types/Recipient';
import cuid from 'cuid';

export const format = (params: { data: Object }): CompanyCustomer => {
  const { data } = params;

  return {
    id: data.id || cuid(),
    createdAt: Date.now(),
    email: data.email,
    address: data.address,
    city: data.city,
    zipcode: data.zipcode,
    firstName: data.firstName,
    lastName: data.lastName,
    ssn: data.ssn,
    mobile: data.mobile,
    company: data.company,
    reccuringPayments: data.reccuringPayments || [],
    VAT: data.VAT,
    defaultTax: data.defaultTax || 0.25,
    bank: {
      giro: data.bank.giro,
      name: data.bank.name,
    },
  };
};
