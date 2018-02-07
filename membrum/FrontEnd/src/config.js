export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  apiGateway: {
    URL: 'https://0mavqugcb8.execute-api.eu-central-1.amazonaws.com/prod',
    REGION: 'eu-central-1',
  },
  cognito: {
    REGION: 'eu-central-1',
    USER_POOL_ID: 'eu-central-1_nQKdo1YbI',
    APP_CLIENT_ID: '169vptc9vp0glhiup6idkarkj0',
    IDENTITY_POOL_ID: 'eu-central-1:6b37b86f-45d5-4b65-ac50-7f43750ea678',
  },
  s3: {
    BUCKET: 'ladok-files',
  },
};
