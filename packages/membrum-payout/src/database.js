/* @flow */
import db from 'zk-dynamodb-wrapper';

export default ({ TableName }: { TableName: string }) => {
  const database = db({ region: 'eu-central-1' });

  return {
    list: async (Values: Object): Promise<*> => {
      return await database.list({
        TableName,
        Values,
      });
    },

    create: async (Item: Object): Promise<*> =>
      await database.create({
        TableName,
        Item,
      }),

    get: async (Key: Object): Promise<*> => {
      return await database.get({
        TableName,
        Key,
      });
    },

    update: async (Key: Object, Values: Object): Promise<*> => {
      return await database.update({
        TableName,
        Key,
        Values,
      });
    },
  };
};
