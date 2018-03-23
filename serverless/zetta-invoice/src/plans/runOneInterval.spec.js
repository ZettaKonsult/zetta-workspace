import request from '../util/http';

/* TODO
Fails if run 2 times in a row
With serverless-offline the test and app is running as 2 seperate processes whcih makes it very hard to mock/spy
Some ways to solve this.
1) Have date as a variable to the handler
2) Have endpoints that allow reset of database in some way
3) Don't run test through serverless-offline, abstract and use dep-inj so normal unit tests can be run

Some ways that probably won't work
1) Allow jest to start serverless offline - should still be 2 processes
*/
describe('Simulate 1 TRF interval', () => {
  it('recipient can be added to plan', async () => {
    const result = await request({
      path: 'plans/recipient',
      payload: {
        method: 'post',
        body: {
          companyCustomerId: 'companyCustomerId123',
          recipientId: 'recipientId',
          planId: 'plan1',
        },
      },
    });

    expect(result.recipientIds).toEqual(['recipientId']);
  });

  it('Returns all proccssed plans', async () => {
    let epoch = Date.UTC(2018, 5, 1);

    const updatedPlans = await request({
      path: `plans/test/${epoch}`,
      payload: {
        method: 'get',
      },
    });

    expect(updatedPlans).toHaveLength(20);
    expect(updatedPlans[0].epochNextProcess).toBe(1530403200000);
  });

  it('no plans are updated during the same interval', async () => {
    let epoch = Date.UTC(2018, 8, 1);

    const updatedPlans = await request({
      path: `plans/test/${epoch}`,
      payload: {
        method: 'get',
      },
    });
    expect(updatedPlans).toHaveLength(20);
    expect(updatedPlans[0].epochNextProcess).toBe(1546300800000);
  });
});
