/* @flow */

/**
 * @date 2018-03-19
 */

import AWS from 'aws-sdk';

let ses;

const get = (): AWS.SES => {
  if (ses == null) {
    ses = new AWS.SES({
      apiVersion: '2010-12-01',
      region: 'eu-west-1',
    });
  }
  return ses;
};

export default {
  get,
};
