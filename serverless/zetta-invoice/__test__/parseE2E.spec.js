import { promisify } from 'util';
import fs from 'fs';
import { incrementToNextLowerBound } from 'date-primitive-utils';

import testConfig from '../src/util/testConfig';
import { request, putS3Object } from '../src/util';

const companyCustomerId = 'companyCustomerId123';
const recipientId = 'recipientId';

let fileNames = [];

beforeAll(async () => {
  try {
    process.env.IS_OFFLINE = true;
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
    await Promise.all(filePromises);
    plans = await Promise.all(plansPromises);
  } catch (error) {
    console.error(error);
  }
});

afterAll(async () => {
  let promise = plans.map(({ id }) =>
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
  await Promise.all(promise);
});

describe('check pipeline for uploading and parsing', () => {
  it('parses all uploaded files', async () => {
    try {
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
              family_name: 'Kuhs',
              given_name: 'Zimon',
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
            nation: 'Undefined Nation',
            ssn: '9006211537',
            unionName: plans.find(plan =>
              plan.labels.find(label => label === 'MED')
            ).id,
          },
          '9105040035': {
            attributes: {
              birthdate: '9105040035',
              email: 'zmk.zk.dev@gmail.com',
              family_name: 'Palmquist',
              given_name: 'Fredrik',
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
            nation: 'Undefined Nation',
            ssn: '9105040035',
            unionName: plans.find(plan =>
              plan.labels.find(label => label === 'USV')
            ).id,
          },
        },
        modified: {},
        same: {},
      });
    } catch (error) {
      console.error(error);
    }
  });
});

describe('Simulate 1 TRF interval', () => {
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

    const updatedPlans = await request({
      host: testConfig.Host,
      path: `plans/test/${epoch}`,
      payload: {
        method: 'get',
      },
    });

    expect(updatedPlans).toHaveLength(1);
    expect(updatedPlans[0].epochNextProcess).toBe(startOfNextInterval);
  });
});

const asyncReadDir = promisify(fs.readdir);
const asyncReadFile = promisify(fs.readFile);
const uploadFile = async (fileName, bucketName = 'ladok-uploads-dev') => {
  const file = await asyncReadFile(`./mocks/ladok/${fileName}`);

  await putS3Object({
    bucketName,
    fileName,
    file,
  });

  fileNames.push(fileName);
};

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
