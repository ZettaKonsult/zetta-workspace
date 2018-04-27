/* @flow */

/**
 * @date  2018-01-15
 */

import type { AWSCallback, AWSContext, AWSEvent } from 'types/AWS';

import cuid from 'cuid';

import { parser, getS3Object, db, getDbTable, failure, success } from '../util';
import parseData from '../../../../packages/ladok-parser';
import { getAssignments } from '../assigner';
import Recipient from '../recipient';
import Plan from '../plans';

export const getNewAssignments = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  try {
    const { companyCustomerId } = parser(event).params;
    callback(null, success(await getAssignments({ db, companyCustomerId })));
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
    const { companyCustomerId } = parser(event).data;
    const { created, updated } = await getAssignments({
      db,
      companyCustomerId,
    });
    let promises = Object.values(created).map(user => {
      const recipient = { ssn: user.ssn, ...user.attributes };
      return Recipient.save({ db, companyCustomerId, recipient });
    });
    let recipients = await Promise.all(promises);
    console.log(`Done saving new users.`);

    const plansPromise = recipients.map(recipient => {
      const { unionName } = created[recipient.ssn];
      return Plan.updateRecipientIds({
        db,
        companyCustomerId,
        recipientId: recipient.id,
        planId: unionName,
      });
    });
    let updatedPlans = await Promise.all(plansPromise);
    console.log(`Done assigning subscriptions.`);
    callback(null, success(updatedPlans));
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
