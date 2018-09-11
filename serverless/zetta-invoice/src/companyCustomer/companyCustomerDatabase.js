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
    return result.Item ? result.Item : {};
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
    const result = await database('update', {
      TableName,
      Key: {
        id: Item.id,
      },
      UpdateExpression: `SET
        address = :address,
        city = :city,
        email = :email,
        firstName = :firstName,
        lastName = :lastName,
        mobile = :mobile,
        zipcode = :zipcode,
        company = :company,
        vat = :vat,
        giro = :giro
      `,
      ExpressionAttributeValues: {
        ':address': Item.address || null,
        ':city': Item.city || null,
        ':email': Item.email || null,
        ':firstName': Item.firstName || null,
        ':lastName': Item.lastName || null,
        ':mobile': Item.mobile || null,
        ':zipcode': Item.zipcode || null,
        ':company': Item.company || null,
        ':vat': Item.vat || null,
        ':giro': Item.giro || null,
      },
      ReturnValues: 'ALL_NEW',
    });
    return result.Attributes;
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
