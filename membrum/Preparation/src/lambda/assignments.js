/* @flow */

/**
 * @date  2018-01-15
 */

import type { AWSCallback, AWSContext, AWSEvent } from 'types/AWS';
import AWS from 'aws-sdk';

import { failure, success } from '../util/response';

import { getAssignments } from '../assigner';
import * as User from '../user';

AWS.config.update({ region: 'eu-central-1' });

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

    const result = await User.saveUnions(assignments);
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
