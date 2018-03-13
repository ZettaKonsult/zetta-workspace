/* @flow */

/**
 * @date 2018-03-12
 */

import Mail from '../src/mail';

describe('Mail.', () => {
  it.skip('Send.', async () => {
    await Mail.send({ data: 'Some data.' });
  });
});
