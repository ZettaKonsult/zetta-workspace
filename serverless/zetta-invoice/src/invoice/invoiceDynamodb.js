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

    list: async locked => {
      return (await database('query', {
        TableName,
        KeyConditionExpression: '#companyCustomerId = :companyCustomerId',
        FilterExpression: '#locked = :locked',
        ExpressionAttributeNames: {
          '#companyCustomerId': 'companyCustomerId',
          '#locked': 'locked',
        },
        ExpressionAttributeValues: {
          ':companyCustomerId': companyCustomerId,
          ':locked': locked,
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

    save: async function(Item) {
      const result = Item.id
        ? await this.update(Item)
        : await this.create(Item);
      return result;
    },
    //TODO remove sequentialId create new function for locking invoice
    update: async Item => {
      return await database('update', {
        TableName,
        Key: {
          id: Item.id,
          companyCustomerId,
        },
        UpdateExpression: `SET
        invoiceRows = :invoiceRows,
        sequentialId = :sequentialId,
        itemStatus = :itemStatus,
        locked = :locked`,
        ExpressionAttributeValues: {
          ':invoiceRows': Item.invoiceRows,
          ':sequentialId': Item.sequentialId || '-1',
          ':locked': Item.locked,
          ':itemStatus': Item.itemStatus,
        },
        ReturnValues: 'ALL_NEW',
      });
    },

    create: async invoice => {
      const Item = {
        id: cuid(),
        companyCustomerId,
        ...invoice,
      };
      await database('put', {
        TableName,
        Item,
      });
      return Item;
    },

    generateInvoiceLockId: async id => {
      const result = await database('update', {
        TableName: 'InvoiceGroups-dev',
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
