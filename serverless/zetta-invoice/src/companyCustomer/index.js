/* @flow */

import companyCustomerDatabase from './companyCustomerDatabase';
import { db, getDbTable } from '../util';

const companyCustomerTable = getDbTable({ name: 'CompanyCustomers' });

export default companyCustomerDatabase(db)(companyCustomerTable);
