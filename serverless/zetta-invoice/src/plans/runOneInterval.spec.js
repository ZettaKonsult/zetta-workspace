import request from '../util/http';

/* TODO
Fails if run 2 times in a row
*/
describe('Simulate 1 TRF interval', () => {
  it('recipient can be added to plan', async () => {
    //TODO
    //ADD RECIPIENT TO PLAN
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

  it('something else', async () => {
    const updatedPlans = await request({
      path: 'plans/test',
      payload: {
        method: 'get',
      },
    });
    expect(updatedPlans).toHaveLength(20);
    expect(updatedPlans[0].epochNextProcess).toBe(1530403200000);
  });

  it('does not run again if it has already been run this interval', async () => {
    const updatedPlans = await request({
      path: 'plans/test',
      payload: {
        method: 'get',
      },
    });
    expect(updatedPlans).toEqual([]);
  });
});
