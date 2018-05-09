/* @flow */

/**
 * @date 2018-05-09
 */

import type { AWSEvent, AWSContext } from 'types/AWS';
import CompanyCustomer from '../companyCustomer';

import { parser, db, failure, success } from '../util';

export const create = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomer } = parser(event).data;

  try {
    const result = await CompanyCustomer.save({ db, companyCustomer });
    return success(result);
  } catch (error) {
    console.error(error);
    return failure(error.message);
  }
};

export const get = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId } = parser(event).params;

  try {
    const result = await CompanyCustomer.get({
      db,
      companyCustomerId,
    });
    return success(result);
  } catch (error) {
    console.error(error);
    return failure(error.message);
  }
};

export const remove = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId } = parser(event).data;
  try {
    const result = await CompanyCustomer.remove({
      db,
      companyCustomerId,
    });
    return success(result);
  } catch (error) {
    console.error(error);
    return failure(error.message);
  }
};
