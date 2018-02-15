import cuid from 'cuid';

const getDbTable = () => {
  if (!process.env.CompanyCustomersTable) {
    throw new Error('Could not read database table from env.CompanyCustomer');
  }
  return process.env.CompanyCustomersTable;
};

const companyCustomer = data => ({
  id: cuid(),
  createdAt: Date.now(),
  firstName: data.firstName,
  lastName: data.lastName,
  address: data.address,
  zipcode: data.zipcode,
  city: data.city,
  email: data.email,
  company: data.company | '',
});

export default async (db, data) => {
  const row = companyCustomer(data);

  await db('put', { TableName: getDbTable(), Item: row });

  const result = await db('scan', { TableName: getDbTable() });

  console.log(result);
};
