/* @flow */

import cuid from 'cuid';
import Invoice from '../invoice';

const { databaseInvoiceGroup } = Invoice;

export default database => TableName => {
  const get = async id => {
    const result = await database('get', {
      TableName,
      Key: {
        id,
      },
    });
    return result.Item;
  };

  const remove = async id => {
    await database('delete', {
      TableName,
      Key: { id },
    });
    return true;
  };

  const save = async function(Item) {
    const result = Item.id ? await update(Item) : await create(Item);
    return result;
  };

  const update = async Item => {
    return await database('put', {
      TableName,
      Item,
      ReturnValues: 'UPDATED_NEW',
    });
  };

  const create = async companyCustomerData => {
    const Item = {
      id: cuid(),
      ...companyCustomerData,
    };

    const [invoiceGroup, companyCustomer] = await Promise.all([
      databaseInvoiceGroup(Item.id).create(),
      database('put', {
        TableName,
        Item,
      }),
    ]);

    return Item;
  };

  return {
    get,
    remove,
    save,
  };
};
