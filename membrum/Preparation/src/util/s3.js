import AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-central-1' });

export const getS3Instance = () => {
  if (process.env.IS_OFFLINE) {
    return new AWS.S3({
      s3ForcePathStyle: true,
      endpoint: new AWS.Endpoint('http://localhost:8040'),
    });
  } else {
    return new AWS.S3();
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
