import recipient from './recipient';

import { success, failure } from './util/response';
import parser from './util/parser';
import db from './util/database';

export const createRecipient = async (event, context, callback) => {
  const { data } = parser(event);

  try {
    const result = await recipient.save(db, data);
    callback(null, success(result));
  } catch (err) {
    console.error(err);
    callback(null, failure(err.message));
  }
};

export const getRecipients = async (event, context, callback) => {
  const { params } = parser(event);

  try {
    const result = await recipient.list(db, params.companyCustomerId);
    callback(null, success(result));
  } catch (err) {
    console.error(err);
    callback(null, failure(err.message));
  }
};
