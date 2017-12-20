import AWS from 'aws-sdk'
import { getAwsCredentials } from './libs/awslib'
import db from 'zk-dynamodb-wrapper'

export default userToken => {
  const database = db({
    region: 'eu-central-1'
  })

  return {
    listAllRooms: async () => {
      await getAwsCredentials(userToken)
      return await database.list({
        TableName: 'rooms',
        Values: { userId: AWS.config.credentials.identityId }
      })
    },

    getRoom: async roomId => {
      await getAwsCredentials(userToken)
      return await database.get({
        TableName: 'rooms',
        Key: { roomId, userId: AWS.config.credentials.identityId }
      })
    },

    updateRoom: async (roomId, Values) => {
      await getAwsCredentials(userToken)
      return await database.update({
        TableName: 'rooms',
        Key: { roomId, userId: AWS.config.credentials.identityId },
        Values
      })
    },

    createRoom: async ({ Item }) => {
      await getAwsCredentials(userToken)
      return await database.create({
        TableName: 'rooms',
        Item: { ...Item, userId: AWS.config.credentials.identityId }
      })
    },

    removeRoom: async ({ Key }) => {
      await getAwsCredentials(userToken)
      return await database.remove({
        TableName: 'rooms',
        Key: { ...Key, userId: AWS.config.credentials.identityId }
      })
    }
  }
}
