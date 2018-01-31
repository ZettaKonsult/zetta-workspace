import db from 'zk-dynamodb-wrapper';

export default ({ TableName }) => {
  const database = db({ region: 'eu-central-1' });

  return {
    list: async Values => {
      return await database.list({
        TableName,
        Values,
      });
    },

    create: async Item =>
      await database.create({
        TableName,
        Item,
      }),

    get: async Key => {
      return await database.get({
        TableName,
        Key,
      });
    },
  };
};
