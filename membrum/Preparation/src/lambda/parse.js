/* @flow */

/**
 * @date  2017-10-03
 */

import type { AWSCallback, AWSContext, AWSEvent } from 'types/AWS';
import type { ParsedUser } from '../types';
import AWS from 'aws-sdk';
import cuid from 'cuid';
import { parseString } from '../parser/ladokParser';
import { getDbTable } from '../util/database';

const table = getDbTable({ name: 'LadokParseResults' });
const s3 = new AWS.S3();
AWS.config.update({ region: 'eu-central-1' });
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const parseUploadedFile = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const fileRepo = event.Records[0].s3;
  const bucketName = fileRepo.bucket.name;
  const fileName = fileRepo.object.key;

  console.log(`Fetching object; Bucket: ${bucketName}, File: ${fileName}`);

  s3.getObject(
    {
      Bucket: bucketName,
      Key: fileName,
    },
    async function(error, data) {
      if (error) {
        console.log(`Error while getting bucket object: ${error}`, error.stack);
        callback(error);
      } else {
        try {
          let people = await parseData(
            data.Body.toString('utf-8'),
            fileName,
            callback
          );
          await updateDatabase(people, fileName, callback);
        } catch (error) {
          console.error(error);
        }
      }
    }
  );
};

export const parseData = async (
  dataString: string,
  fileName: string,
  callback: AWSCallback
): Promise<Array<ParsedUser>> => {
  let people = [];
  try {
    (await parseString(dataString, fileName)).forEach(person =>
      people.push(person.toJSON())
    );
  } catch (error) {
    console.error(`Error while parsing in insertParseResult():\n    ${error}`);
    throw error;
  }
  return (people: Array<ParsedUser>);
};

const updateDatabase = async (
  people: Array<ParsedUser>,
  fileName: string,
  callback: AWSCallback
) => {
  const params = {
    TableName: table,

    Item: {
      id: cuid(),
      file: fileName,
      people: people,
      createdAt: new Date().getTime(),
    },
  };

  dynamoDb.put(params, (error, data) => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    };

    if (error) {
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({ status: false }),
      };
      console.error(`Error updating table ${params.TableName}:\n${error}`);
      callback(null, response);
      return;
    }

    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
