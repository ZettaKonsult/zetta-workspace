/* @flow */

import { getBySSN } from './get';
import { db, getDbTable } from '../util';
import recipientDatabase from './recipientDatabase';

const TableName = getDbTable({ name: 'Recipients' });
const database = recipientDatabase(db)(TableName);

export default companyCustomerId => database(companyCustomerId);
export { getBySSN };
