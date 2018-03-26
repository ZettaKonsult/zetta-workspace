import request from '../util/http';
import testConfig from '../util/testConfig';

const host = testConfig.Host;
const companyCustomerId = 'companyCustomerId123';
const recipientId = 'recipientId';
let plan = {
  name: 'TestPlan',
  price: 0,
  interval: 'month',
  intervalCount: 6,
  labels: ['union'],
  group: ['studentlund'],
};

afterAll(async () => {
  await request({
    host,
    path: 'plans',
    payload: {
      method: 'delete',
      body: {
        planId: plan.id,
        companyCustomerId,
      },
    },
  });
});

describe('Simulate 1 TRF interval', () => {
  it('new plan is created', async () => {
    plan = await request({
      host,
      path: 'plans',
      payload: {
        method: 'post',
        body: {
          companyCustomerId,
          plan,
        },
      },
    });

    expect(plan).toHaveProperty('id');
  });

  it('recipient can be added to plan', async () => {
    const result = await request({
      host,
      path: 'plans/recipient',
      payload: {
        method: 'post',
        body: {
          companyCustomerId: 'companyCustomerId123',
          recipientId,
          planId: plan.id,
        },
      },
    });

    expect(result.recipientIds).toEqual([recipientId]);
  });

  it('Returns all proccssed plans', async () => {
    let epoch = Date.now();
    let startOfNextInterval = 1530403200000;

    const updatedPlans = await request({
      host,
      path: `plans/test/${epoch}`,
      payload: {
        method: 'get',
      },
    });

    expect(updatedPlans).toHaveLength(1);
    expect(updatedPlans[0].epochNextProcess).toBe(startOfNextInterval);
  });

  it('no plans are updated during the same interval', async () => {
    let epoch = Date.now();

    const updatedPlans = await request({
      host,
      path: `plans/test/${epoch}`,
      payload: {
        method: 'get',
      },
    });

    expect(updatedPlans).toHaveLength(0);
  });

  it('plans are update for new interval', async () => {
    let now = Date.now();
    let sixMonths = 100000000000;
    let startOfNextInterval = 1546300800000;
    let epoch = new Date(now + sixMonths).getTime();

    const updatedPlans = await request({
      host,
      path: `plans/test/${epoch}`,
      payload: {
        method: 'get',
      },
    });

    expect(updatedPlans).toHaveLength(1);
    expect(updatedPlans[0].epochNextProcess).toBe(startOfNextInterval);
  });
});
