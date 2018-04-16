import S3 from 'aws-sdk/clients/s3';

export const getS3Instance = () => {
  if (process.env.IS_OFFLINE) {
    return new S3({
      s3ForcePathStyle: true,
      region: 'eu-central-1',
      endpoint: 'http://localhost:8040',
    });
  } else {
    return new S3({ region: 'eu-central-1' });
  }
};

export const getS3Object = async ({ bucketName, fileName }) => {
  return await getS3Instance()
    .getObject({
      Bucket: bucketName,
      Key: fileName,
    })
    .promise();
};

export const putS3Object = async ({ bucketName, fileName, file }) => {
  return await getS3Instance()
    .putObject({
      Bucket: bucketName,
      Key: fileName,
      Body: file,
    })
    .promise();
};
