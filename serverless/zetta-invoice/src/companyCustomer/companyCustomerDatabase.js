/* @flow */

import cuid from 'cuid';

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
    await database('put', {
      TableName,
      Item,
      ReturnValues: 'UPDATED_NEW',
    });
  };

  const create = async companyCustomer => {
    const Item = {
      id: cuid(),
      ...companyCustomer,
    };
    await database('put', {
      TableName,
      Item,
    });
    return Item;
  };

  return {
    get,
    remove,
    save,
  };
};
