import parser from 'serverless-event-parser';

import response from './response';
import db from './database';

export const createCompanyCustomer = async (event, context, callback) => {
  let statusCode = 200;
  const { data } = parser(event);

  callback(null, response(statusCode, true));
};
