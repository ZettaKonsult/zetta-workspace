import * as handler from '../handler';

const customerId = 'cjdehs2tf0000tccvwj733tus';

test('getAllBillableRows()', async () => {
  const event = { body: `{"customerId":"${customerId}"}` };
  const context = 'context';
  const callback = (error, response) => {
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('object');
  };

  await handler.getAllBillableRows(event, context, callback);
});

test('createInvoice()', async () => {
  const event = {
    body: `{
        "customerId":"${customerId}",
        "billableTimeId": ["cjdfwxoup0002x4cv6g2iicf4"]
      }`,
  };
  const context = 'context';
  const callback = (error, response) => {
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('object');
  };

  await handler.updateRowStage(event, context, callback);
});
