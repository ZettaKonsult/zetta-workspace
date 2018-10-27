import { promisify } from 'util';
import fs from 'fs';
import { putS3Object } from '../src/util';

export const asyncReadDir = promisify(fs.readdir);

const asyncReadFile = promisify(fs.readFile);
export const uploadFile = async (
  fileName,
  bucketName = 'ladok-uploads-dev'
) => {
  const file = await asyncReadFile(`./mocks/ladok/${fileName}`);

  await putS3Object({
    bucketName,
    fileName,
    file,
  });

  return fileName;
};
