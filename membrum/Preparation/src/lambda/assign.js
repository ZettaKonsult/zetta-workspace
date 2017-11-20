/**
 * Lambda function handler assigning unions to LADOK people in a database.
 *
 * @date  2017-11-07
 */
import * as unionAssigner from '../unionAssigner'
import AWS from 'aws-sdk'

AWS.config.update({ region: 'eu-central-1' })
const dynamoDB = new AWS.DynamoDB.DocumentClient()

export const getParseResults = async (event, context, callback) => {
  const params = {
    TableName: 'LadokParseResult'
  }

  dynamoDB.scan(params, (error, data) => {
    if (error) {
      console.error(`Error fetching people from database:\n${error}`)
      return
    }
    return unionAssigner.getAssignments(data.Items)
  })
}
