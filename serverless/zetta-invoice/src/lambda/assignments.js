/* @flow */

/**
 * @date  2018-01-15
 */

import type { AWSContext, AWSEvent } from 'types/AWS';

import cuid from 'cuid';

import { parser, getS3Object, db, getDbTable, failure, success } from '../util';
import parseData from '../../../../packages/ladok-parser';
import { getAssignments } from '../assigner';
import Recipient from '../recipient';
import Plan from '../plans';

export const getNewAssignments = async (
  event: AWSEvent,
  context: AWSContext
) => {
  try {
    const { companyCustomerId } = parser(event).params;

    const result = await getAssignments({ db, companyCustomerId });

    return success(result);
  } catch (error) {
    console.error(error);
    return failure(error.message);
  }
};

export const saveNewAssignments = async (
  event: AWSEvent,
  context: AWSContext
) => {
  try {
    const { companyCustomerId } = parser(event).data;
    const { created, updated } = await getAssignments({
      db,
      companyCustomerId,
    });
    let promises = Object.values(created).map(user => {
      const recipient = {
        ssn: user.ssn,
        ...user.attributes,
        reccuringPayments: user.reccuringPayments,
      };
      return Recipient.save({ db, companyCustomerId, recipient });
    });
    let recipients = await Promise.all(promises);
    console.log(`Done saving new users.`);
    console.log(recipients);
    const plansPromise = recipients.map(recipient => {
      const { reccuringPayments } = created[recipient.ssn];
      return Plan.updateRecipientIds({
        db,
        companyCustomerId,
        recipientId: recipient.id,
        planId: reccuringPayments[0],
      });
    });
    const result = await Promise.all(plansPromise);
    console.log(`Done assigning subscriptions.`);
    return success(result);
  } catch (error) {
    return failure(error.message);
  }
};

export const parseUploadedFile = async (
  event: AWSEvent,
  context: AWSContext
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

    return success(params.Item);
  } catch (error) {
    console.error('Error happend', error);
    return failure(error.message);
  }
};
