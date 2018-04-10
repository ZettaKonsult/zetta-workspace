import { promisify } from 'util';
import fs from 'fs';

import request from '../util/http';
import { putS3Object } from '../util/s3';

process.env.IS_OFFLINE = true;

const asyncReadDir = promisify(fs.readdir);
const asyncReadFile = promisify(fs.readFile);

const bucketName = 'ladok-uploads-dev';
let fileNames = [];

beforeAll(async () => {
  try {
    const result = await asyncReadDir('./mocks/ladok');
    const promises = result.map(fileName => uploadFile(fileName, bucketName));
    await Promise.all(promises);
  } catch (error) {
    console.error(error);
  }
});

describe('check pipeline for uploading and parsing', () => {
  it('parses all uploaded files', async () => {
    try {
      const promise = fileNames.map(fileName =>
        request({
          path: 'ladok/parse',
          payload: { method: 'post', body: { fileName } },
        })
      );
      await Promise.all(promise);

      const result = await request({ path: 'assignments/get' });

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
            unionName: 'Corpus Medicus',
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
            unionName: [
              'LundaEkonomerna',
              'Lunds Naturvetarkår',
              'Samhällsvetarkåren',
            ],
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

const uploadFile = async (fileName, bucketName) => {
  const file = await asyncReadFile(`./mocks/ladok/${fileName}`);

  await putS3Object({
    bucketName,
    fileName,
    file,
  });

  fileNames.push(fileName);
};
