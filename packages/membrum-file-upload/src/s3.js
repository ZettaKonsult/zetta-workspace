/* @flow */
import S3 from 'aws-sdk/clients/s3';

export default ({ Bucket }) => {
  const uploadProvider = new S3({
    params: {
      Bucket,
    },
  });

  const upload = file => {
    return uploadProvider
      .upload({
        Key: file.name,
        Body: file.body,
        ContentType: file.type,
        ACL: 'public-read',
      })
      .promise();
  };

  return { upload };
};
