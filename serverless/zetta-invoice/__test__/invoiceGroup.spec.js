/**
 * @date 2018-03-05
 */
import { request, testConfig } from '../src/util/';

const host = testConfig.Host;

describe('InvoiceGroup', () => {
  let invoiceGroup = {};

  it('create a group', async () => {
    const data = {
      recipient: {
        name: 'testGroup',
        value: 100,
      },
    };

    invoiceGroup = await request({
      host,
      path: 'invoice/group',
      payload: {
        method: 'post',
        body: data,
      },
    });

    expect({ ...invoiceGroup }).toMatchSnapshot({
      id: expect.any(String),
    });
  });

  it('delete group', async () => {
    const data = { id: invoiceGroup.id };

    const result = await request({
      host,
      path: 'invoice/group',
      payload: {
        method: 'delete',
        body: data,
      },
    });

    expect(result).toBeTruthy();
  });
});
