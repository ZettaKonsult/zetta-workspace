/* @flow */

/**
 * @date  2017-10-03
 */

import AWS from 'aws-sdk'
import uuid from 'uuid'
import { parseString } from '../ladokParser'

const s3 = new AWS.S3()
AWS.config.update({ region: 'eu-central-1' })
const dynamoDb = new AWS.DynamoDB.DocumentClient()

export const parseUploadedFile = async (event, context, callback) => {
  const fileRepo = event.Records[0].s3
  const bucketName = fileRepo.bucket.name
  const fileName = fileRepo.object.key

  console.log(`Fetching object; Bucket: ${bucketName}, File: ${fileName}`)

  s3.getObject(
    {
      Bucket: bucketName,
      Key: fileName
    },
    async function(error, data) {
      if (error) {
        console.log(`Error while getting bucket object: ${error}`, error.stack)
        callback(error)
      } else {
        try {
          let people = await parseData(
            data.Body.toString('utf-8'),
            fileName,
            callback
          )
          await updateDatabase(people, fileName, callback)
        } catch (error) {
          console.error(error)
        }
      }
    }
  )
}

const parseData = async (string, fileName, callback) => {
  let people = []
  try {
    people = await parseString(string, fileName, true)
  } catch (error) {
    console.error(`Error while parsing in insertParseResult():\n    ${error}`)
    return
  }
  return people
}

const updateDatabase = async (people, fileName, callback) => {
  const params = {
    TableName: 'LadokParseResult',

    Item: {
      Index: uuid.v1(),
      file: fileName,
      people: people,
      createdAt: new Date().getTime()
    }
  }

  dynamoDb.put(params, (error, data) => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }

    if (error) {
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({ status: false })
      }
      console.error(`Error updating table ${params.TableName}:\n${error}`)
      callback(null, response)
      return
    }

    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(params.Item)
    }
    callback(null, response)
  })
}
