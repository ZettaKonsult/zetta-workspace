import { incrementToNextLowerBound } from 'date-primitive-utils';

import request from '../util/http';
import testConfig from '../util/testConfig';

const host = testConfig.Host;

const companyCustomerId = 'companyCustomerId123';
const recipientId = 'recipientId';
let plans = [
  {
    name: 'TestPlan',
    price: 0,
    interval: 'month',
    intervalCount: 1,
    labels: ['union'],
    group: ['studentlund'],
  },
  {
    name: 'TestPlan1',
    price: 0,
    interval: 'month',
    intervalCount: 6,
    labels: ['union'],
    group: ['studentlund'],
  },
];

beforeAll(async () => {
  let promise = plans.map(plan =>
    request({
      host,
      path: 'plans',
      payload: {
        method: 'post',
        body: {
          companyCustomerId,
          plan,
        },
      },
    })
  );
  plans = await Promise.all(promise);
});

describe('Simulate 1 TRF interval', () => {
  let testPlans = [];

  it('recipient can be added to plan', async () => {
    let plan = plans[0];

    plan = await request({
      host,
      path: 'plans/recipient',
      payload: {
        method: 'post',
        body: {
          companyCustomerId,
          recipientId,
          planId: plan.id,
        },
      },
    });

    expect(plan.recipientIds).toEqual([recipientId]);
  });

  it('Returns all proccssed plans', async () => {
    let plan = plans[0];
    let epoch = Date.now();
    let startOfNextInterval = incrementToNextLowerBound(
      epoch,
      plan.intervalCount
    );

    testPlans = await request({
      host,
      path: `plans/test/${epoch}`,
      payload: {
        method: 'get',
      },
    });

    expect(testPlans).toHaveLength(2);
    expect(testPlans[0].epochNextProcess).toBe(startOfNextInterval);
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
    let plan = testPlans[0];
    let epoch = plan.epochNextProcess;
    let startOfNextInterval = incrementToNextLowerBound(
      epoch,
      plan.intervalCount
    );

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

afterAll(async () => {
  let promise = plans.map(({ id }) =>
    request({
      host,
      path: 'plans',
      payload: {
        method: 'delete',
        body: {
          planId: id,
          companyCustomerId,
        },
      },
    })
  );
  await Promise.all(promise);
});
