const AWS = require('aws-sdk');

(async () => {
  console.log('start');

  const S3 = new AWS.S3({
    s3ForcePathStyle: true,
    endpoint: new AWS.Endpoint('http://localhost:8040'),
  });

  try {
    const result = await S3.putObject({
      Bucket: 'local-bucket',
      Key: '1234',
      Body: new Buffer('abcd'),
    }).promise();
    console.log(result, 'done');
  } catch (err) {
    console.err(err);
  }
})();
