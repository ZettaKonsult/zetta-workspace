export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    BUCKET: 'hotel-booking-uploads',
  },
  apiGateway: {
    URL: 'https://nmurnswy1b.execute-api.eu-central-1.amazonaws.com/prod',
    REGION: 'eu-central-1',
  },
  cognito: {
    REGION: 'eu-central-1',
    USER_POOL_ID: 'eu-central-1_bkxoGLEhK',
    APP_CLIENT_ID: '53bt6er1rjvtn5pdjhrr07rtgj',
    IDENTITY_POOL_ID: 'eu-central-1:31bcf943-5ab2-414c-9b38-0de8939c4392',
  },
};
