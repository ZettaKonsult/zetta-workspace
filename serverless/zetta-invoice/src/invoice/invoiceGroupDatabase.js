/* @flow */

import cuid from 'cuid';

const defaultGroup = {
  name: 'default',
  value: 0,
};

export default database => TableName => companyCustomerId => {
  return {
    list: async () => {
      const result = await database('query', {
        TableName,
        KeyConditionExpression: '#companyCustomerId = :companyCustomerId',
        ExpressionAttributeNames: {
          '#companyCustomerId': 'companyCustomerId',
        },
        ExpressionAttributeValues: {
          ':companyCustomerId': companyCustomerId,
        },
      });
      return result.Items;
    },

    remove: async id => {
      await database('delete', {
        TableName,
        Key: { id, companyCustomerId },
      });
      return true;
    },

    create: async (group = {}) => {
      const Item = {
        companyCustomerId,
        id: cuid(),
        name: group.name || defaultGroup.name,
        currentId: Number(group.value) || defaultGroup.value,
      };
      await database('put', {
        TableName,
        Item,
      });
      return Item;
    },

    generateInvoiceLockId: async id => {
      const result = await database('update', {
        TableName,
        ExpressionAttributeValues: {
          ':incr': 1,
        },
        Key: {
          companyCustomerId,
          id,
        },
        ReturnValues: 'UPDATED_NEW',
        UpdateExpression: 'SET currentId = currentId + :incr',
      });
      return result.Attributes.currentId;
    },
  };
};
