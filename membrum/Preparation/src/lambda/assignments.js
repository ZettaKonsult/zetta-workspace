/* @flow */

/**
 * @date  2018-01-15
 */

import type { AWSCallback, AWSContext, AWSEvent } from 'types/AWS';

import cuid from 'cuid';

import parser from '../util/parser';
import { getS3Object } from '../util/s3';
import db, { getDbTable } from '../util/database';
import { failure, success } from '../util/response';

import parseData from '../../../../packages/ladok-parser';
import { getAssignments, saveUnions } from '../assigner';

export const getNewAssignments = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  try {
    callback(null, success(await getAssignments(callback)));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
  }
};

export const saveNewAssignments = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  try {
    const assignments = await getAssignments(callback);

    const result = await saveUnions(assignments);
    console.log(`Done saving new users.`);

    // TODO: Use Plans instead.
    // await Membership.saveSubscriptions({
    //   users: result.registered
    //     .concat(result.updated)
    //     .reduce((object, ssn) => ({ ...object, [ssn]: users[ssn] }), {}),
    // });
    console.log(`Done assigning subscriptions.`);
    callback(null, result);
  } catch (error) {
    callback(error);
  }
};

export const parseUploadedFile = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  let fileName;
  let bucketName;

  if (process.env.IS_OFFLINE) {
    fileName = parser(event).data.fileName;
    bucketName = process.env.S3UploadFolder;
  } else {
    const fileRepo = event.Records[0].s3;
    bucketName = fileRepo.bucket.name;
    fileName = fileRepo.object.key;
    console.log(`Fetching object; Bucket: ${bucketName}, File: ${fileName}`);
  }
  try {
    const data = await getS3Object({ bucketName, fileName });
    const people = await parseData(data.Body.toString('utf-8'), fileName);

    const params = {
      TableName: getDbTable({ name: 'LadokParseResults' }),
      Item: {
        id: cuid(),
        file: fileName,
        people,
        createdAt: new Date().getTime(),
      },
    };
    await db('put', params);

    callback(null, success(params.Item));
  } catch (error) {
    console.error('Error happend', error);
    callback(null, failure(error.message));
  }
};
