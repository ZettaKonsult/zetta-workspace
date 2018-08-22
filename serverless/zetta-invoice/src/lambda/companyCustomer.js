/* @flow */

/**
 * @date 2018-05-09
 */

import type { AWSEvent, AWSContext } from 'types/AWS';
import CompanyCustomer from '../companyCustomer';

import { parser, failure, success } from '../util';

export const create = async (event: AWSEvent, context: AWSContext) => {
  const companyCustomerId = event.requestContext.identity.cognitoIdentityId;
  const { companyCustomer } = parser(event).data;

  try {
    const result = await CompanyCustomer.save({
      ...companyCustomer,
      id: companyCustomerId,
    });
    console.log(result);
    return success(result);
  } catch (error) {
    console.error(error);
    return failure(error.message);
  }
};

export const get = async (event: AWSEvent, context: AWSContext) => {
  const companyCustomerId = event.requestContext.identity.cognitoIdentityId;

  try {
    const result = await CompanyCustomer.get(companyCustomerId);
    return success(result);
  } catch (error) {
    console.error(error);
    return failure(error.message);
  }
};

export const remove = async (event: AWSEvent, context: AWSContext) => {
  const companyCustomerId = event.requestContext.identity.cognitoIdentityId;
  try {
    const result = await CompanyCustomer.remove(companyCustomerId);
    return success(result);
  } catch (error) {
    console.error(error);
    return failure(error.message);
  }
};
