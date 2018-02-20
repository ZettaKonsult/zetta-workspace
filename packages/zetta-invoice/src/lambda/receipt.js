import * as Receipt from '../receipt';
import db from '../database';
import { getTable } from '../config';
import parser from 'serverless-event-parser';

const TABLE_NAME = 'Receipts';

export const create = async (event, context, callback) => {
  const { data } = parser(event);

  try {
    const receipt = await Receipt.create({ ...data });
    await db('create', {
      TableName: getTable({ name: TABLE_NAME }),
      Item: receipt,
    });
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
