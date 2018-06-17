/**
 * @date 2018-03-05
 */
import cuid from 'cuid';
import { request, testConfig } from '../src/util/';

const host = testConfig.Host;
const companyCustomerId1 = cuid();
const companyCustomerId2 = cuid();
let invoices = [
  {
    companyCustomerId: companyCustomerId1,
    invoiceRows: [
      { description: '3an A', unit: 34, price: 345, tax: 0.25 },
      { description: '3an B', unit: 34, price: 345, tax: 0.25 },
      { description: '3an C', unit: 34, price: 345, tax: 0.25 },
    ],
    recipientIds: ['recipientId1'],
  },
  {
    companyCustomerId: companyCustomerId2,
    invoiceRows: [
      { description: '3an A', unit: 34, price: 345, tax: 0.25 },
      { description: '3an B', unit: 34, price: 345, tax: 0.25 },
      { description: '3an C', unit: 34, price: 345, tax: 0.25 },
    ],
    recipientIds: ['recipientId1'],
  },
];

beforeAll(async () => {
  let invoicesPromise = invoices.map(invoice =>
    request({
      host,
      path: `invoice`,
      payload: {
        method: 'post',
        body: invoice,
      },
    })
  );
  invoices = await Promise.all(invoicesPromise);
});

afterAll(async () => {
  let invoicesPromise = invoices.map(invoice =>
    request({
      host,
      path: 'invoice',
      payload: {
        method: 'delete',
        body: {
          companyCustomerId: invoice.companyCustomerId,
          invoiceId: invoice.id,
        },
      },
    })
  );
  await Promise.all(invoicesPromise);
});

describe('Invoices', () => {
  it('invoices have correct attributes after creation', () => {
    let invoice = invoices[0];

    expect(invoice).toMatchSnapshot({
      id: expect.any(String),
      companyCustomerId: expect.any(String),
      createdAt: expect.any(Number),
    });
  });
});
