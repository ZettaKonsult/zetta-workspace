/* @flow */

import cuid from 'cuid';

export default database => TableName => companyCustomerId => {
  return {
    get: async id => {
      const result = await database('get', {
        TableName,
        Key: {
          companyCustomerId,
          id,
        },
      });
      return result.Item;
    },

    getAll: async ids => {
      const Keys = ids.map(id => ({
        id,
        companyCustomerId,
      }));
      const params = {
        RequestItems: {
          [TableName]: {
            Keys,
          },
        },
      };
      const result = await database('batchGet', params);

      return result.Responses[TableName];
    },

    list: async () => {
      return (await database('query', {
        TableName,
        KeyConditionExpression: '#companyCustomerId = :companyCustomerId',
        ExpressionAttributeNames: {
          '#companyCustomerId': 'companyCustomerId',
        },
        ExpressionAttributeValues: {
          ':companyCustomerId': companyCustomerId,
        },
      })).Items;
    },

    remove: async id => {
      await database('delete', {
        TableName,
        Key: { id, companyCustomerId },
      });
      return true;
    },

    save: async function(item) {
      const result = item.id
        ? await this.update(item)
        : await this.create(item);
      return result;
    },

    update: async Item => {
      const result = await database('update', {
        TableName,
        Key: {
          id: Item.id,
          companyCustomerId,
        },
        UpdateExpression: `SET
          address = :address,
          city = :city,
          email = :email,
          firstName = :firstName,
          lastName = :lastName,
          mobile = :mobile,
          ssn = :ssn,
          zipcode = :zipcode`,
        ExpressionAttributeValues: {
          ':address': Item.address || '',
          ':city': Item.city || '',
          ':email': Item.email || '',
          ':firstName': Item.firstName || '',
          ':lastName': Item.lastName || '',
          ':mobile': Item.mobile || '',
          ':ssn': Item.ssn || '',
          ':zipcode': Item.zipcode || '',
        },
        ReturnValues: 'ALL_NEW',
      });

      return result.Attributes;
    },

    create: async item => {
      const Item = {
        id: cuid(),
        companyCustomerId,
        ...item,
      };
      await database('put', {
        TableName,
        Item,
      });
      return Item;
    },
  };
};
