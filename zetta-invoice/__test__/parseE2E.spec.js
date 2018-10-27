import cuid from 'cuid';
import { incrementToNextLowerBound } from 'date-primitive-utils';

import { asyncReadDir, uploadFile } from './testHelpers';
import { request, testConfig } from '../src/util/';

const companyCustomerId = cuid();
let recipients = [];
let fileNames = [];
process.env.IS_OFFLINE = true;

beforeAll(async () => {
  try {
    const result = await asyncReadDir('./mocks/ladok');
    let filePromises = result.map(fileName => uploadFile(fileName));
    let plansPromises = plans.map(plan =>
      request({
        host: testConfig.Host,
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
    fileNames = await Promise.all(filePromises);
    plans = await Promise.all(plansPromises);
  } catch (error) {
    console.error(error);
  }
});

afterAll(async () => {
  let planPromise = plans.map(({ id }) =>
    request({
      host: testConfig.Host,
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
  let recipientPromise = recipients.map(id =>
    request({
      host: testConfig.Host,
      path: 'recipient',
      payload: {
        method: 'delete',
        body: {
          recipientId: id,
          companyCustomerId,
        },
      },
    })
  );
  await Promise.all([...planPromise, ...recipientPromise]);
});

describe.skip('check pipeline for uploading and parsing', () => {
  it('parses all uploaded files', async () => {
    const promise = fileNames.map(fileName =>
      request({
        host: testConfig.Host,
        path: 'ladok/parse',
        payload: { method: 'post', body: { fileName } },
      })
    );
    await Promise.all(promise);

    const result = await request({
      host: testConfig.Host,
      path: `assignments/${companyCustomerId}`,
      payload: { method: 'get', body: {} },
    });

    expect(result).toEqual({
      created: {
        '9006211537': {
          attributes: {
            birthdate: '9006211537',
            email: 'zmk.zk.dev@gmail.com',
            lastName: 'Kuhs',
            firstName: 'Zimon',
          },
          credits: {
            EHL: 21.5,
            HT: 2.5,
            JUR: 12.5,
            KO: 0.5,
            MED: 322.5,
            NAT: 2,
            SAM: 2,
            USV: 221.5,
          },
          ssn: '9006211537',
          reccuringPayments: [
            plans.find(plan => plan.labels.find(label => label === 'MED')).id,
          ],
        },
        '9105040035': {
          attributes: {
            birthdate: '9105040035',
            email: 'zmk.zk.dev@gmail.com',
            lastName: 'Palmquist',
            firstName: 'Fredrik',
          },
          credits: {
            EHL: 35.5,
            HT: 30.5,
            JUR: 27.5,
            KO: 137.5,
            MED: 117.5,
            NAT: 7.5,
            SAM: 3,
            USV: 317.5,
          },
          ssn: '9105040035',
          reccuringPayments: [
            plans.find(plan => plan.labels.find(label => label === 'USV')).id,
          ],
        },
      },
      modified: {},
      same: {},
    });
  });

  it('save assigns recipients to plans', async () => {
    const result = await request({
      host: testConfig.Host,
      path: `assignments`,
      payload: { method: 'put', body: { companyCustomerId } },
    });

    recipients = result.reduce(
      (total, plan) => [...total, ...plan.recipientIds],
      []
    );

    expect(recipients).toHaveLength(2);
  });

  it('The assigned members should be returned as unchanged', async () => {
    const result = await request({
      host: testConfig.Host,
      path: `assignments/${companyCustomerId}`,
      payload: { method: 'get', body: {} },
    });

    expect(result).toEqual({
      created: {},
      modified: {},
      same: {
        '9006211537': {
          companyCustomerId,
          email: 'zmk.zk.dev@gmail.com',
          birthdate: '9006211537',
          firstName: 'Zimon',
          id: recipients[1],
          lastName: 'Kuhs',
          reccuringPayments: [
            plans.find(plan => plan.labels.find(label => label === 'MED')).id,
          ],
          ssn: '9006211537',
        },
        '9105040035': {
          companyCustomerId,
          email: 'zmk.zk.dev@gmail.com',
          birthdate: '9105040035',
          firstName: 'Fredrik',
          id: recipients[0],
          lastName: 'Palmquist',
          reccuringPayments: [
            plans.find(plan => plan.labels.find(label => label === 'USV')).id,
          ],
          ssn: '9105040035',
        },
      },
    });
  });
});

describe('Simulate 1 TRF interval', () => {
  const recipientId = cuid();
  let testPlans = [];

  it('recipient can be added to plan', async () => {
    let plan = plans[0];

    plan = await request({
      host: testConfig.Host,
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
      host: testConfig.Host,
      path: `plans/test/${epoch}`,
      payload: {
        method: 'get',
      },
    });

    expect(testPlans).toHaveLength(9);
    expect(testPlans[0].epochNextProcess).toBe(startOfNextInterval);
  });

  it('no plans are updated during the same interval', async () => {
    let epoch = Date.now();

    const updatedPlans = await request({
      host: testConfig.Host,
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
    const expectedLength = findPlansThatWillProcess(startOfNextInterval)(
      testPlans
    );

    const updatedPlans = await request({
      host: testConfig.Host,
      path: `plans/test/${epoch}`,
      payload: {
        method: 'get',
      },
    });

    expect(updatedPlans).toHaveLength(expectedLength);
    expect(updatedPlans[0].epochNextProcess).toBe(startOfNextInterval);
  });
});

const findPlansThatWillProcess = epoch => plans =>
  plans.filter(plan => plan.epochNextProcess <= epoch).length;

let plans = [
  {
    name: 'TestPlan',
    price: 0,
    interval: 'month',
    intervalCount: 1,
    labels: ['union', 'EHL'],
    group: ['studentlund'],
  },
  {
    name: 'TestPlan1',
    price: 0,
    interval: 'month',
    intervalCount: 6,
    labels: ['union', 'HT'],
    group: ['studentlund'],
  },
  {
    name: 'TestPlan2',
    price: 0,
    interval: 'month',
    intervalCount: 6,
    labels: ['union', 'JUR'],
    group: ['studentlund'],
  },
  {
    name: 'TestPlan3',
    price: 0,
    interval: 'month',
    intervalCount: 6,
    labels: ['union', 'KO'],
    group: ['studentlund'],
  },
  {
    name: 'TestPlan4',
    price: 0,
    interval: 'month',
    intervalCount: 6,
    labels: ['union', 'LTH'],
    group: ['studentlund'],
  },
  {
    name: 'TestPlan5',
    price: 0,
    interval: 'month',
    intervalCount: 6,
    labels: ['union', 'MED'],
    group: ['studentlund'],
  },
  {
    name: 'TestPlan6',
    price: 0,
    interval: 'month',
    intervalCount: 6,
    labels: ['union', 'NAT'],
    group: ['studentlund'],
  },
  {
    name: 'TestPlan7',
    price: 0,
    interval: 'month',
    intervalCount: 6,
    labels: ['union', 'SAM'],
    group: ['studentlund'],
  },
  {
    name: 'TestPlan8',
    price: 0,
    interval: 'month',
    intervalCount: 6,
    labels: ['union', 'USV'],
    group: ['studentlund'],
  },
];
