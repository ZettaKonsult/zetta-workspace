/**
 * @date 2018-03-12
 */

import request from './util/http';
import testConfig from './util/config';

const host = testConfig.Host;

afterEach(async () => {
  console.log(`After each, clean up...`);
  if (false) {
    request();
  }
});

describe('Invoice test.', () => {
  it('Full flow.', async () => {
    console.log(`Host: ${host}.`);
    console.log(`TODO: all of this.`);
  });
});
