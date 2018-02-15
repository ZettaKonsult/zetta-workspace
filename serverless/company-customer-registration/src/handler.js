import parser from 'serverless-event-parser';

import response from './response';
import db from './database';
import companyCustomer from './companyCustomer';

export const createCompanyCustomer = async (event, context, callback) => {
  let statusCode = 200;
  const { data } = parser(event);

  await companyCustomer(db, data);

  callback(null, response(statusCode, true));
};
