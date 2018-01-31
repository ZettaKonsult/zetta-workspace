/* @flow */
import db from 'zk-dynamodb-wrapper';

export default ({ TableName }: { TableName: string }) => {
  const database = db({ region: 'eu-central-1' });

  return {
    list: async (Values: Object) => {
      return await database.list({
        TableName,
        Values,
      });
    },

    create: async (Item: Object) =>
      await database.create({
        TableName,
        Item,
      }),

    get: async (Key: Object) => {
      return await database.get({
        TableName,
        Key,
      });
    },
  };
};
