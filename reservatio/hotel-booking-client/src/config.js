export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    BUCKET: 'hotel-booking-uploads'
  },
  apiGateway: {
    URL: 'https://nmurnswy1b.execute-api.eu-central-1.amazonaws.com/prod',
    REGION: 'eu-central-1'
  },
  cognito: {
    REGION: 'eu-central-1',
    USER_POOL_ID: 'eu-central-1_pl5XFMSSB',
    APP_CLIENT_ID: 'omj6fq13ucpggs7vhr61el3v0',
    IDENTITY_POOL_ID: 'eu-central-1:aace001e-9562-4b7a-afe0-a580d1e57f17'
  }
}
