/* @flow */

import type { Recipient } from 'types/Recipient';
import cuid from 'cuid';

export const format = (params: {
  data: Object,
  companyCustomerId: string,
}): Recipient => {
  const { data, companyCustomerId } = params;

  return {
    id: data.id || cuid(),
    companyCustomerId: companyCustomerId,
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
  };
};
