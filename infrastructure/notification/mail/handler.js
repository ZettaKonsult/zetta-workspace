import aws from 'aws-sdk'
const ses = new aws.SES({
  region: 'eu-west-1'
})

export const mailer = async (event, context, callback) => {
  try {
    const params = JSON.parse(event.body)
    validateEmailParams(params)
    console.log('===SENDING EMAIL===')
    await sendMail(formatEmailParams(params))
    console.log('===DONE===')
  } catch (error) {
    console.error(`${error}`)
  }
}

const sendMail = params => ses.sendTemplatedEmail(params).promise()

export const validateEmailParams = params => {
  const requiredProperties = ['to', 'from', 'subject']
  requiredProperties.forEach(property => {
    if (!params.hasOwnProperty(property)) {
      throw new Error(`request does not have required property: ${property}`)
    }
  })

  return true
}

export const formatEmailParams = params => ({
  Source: params.from,
  Template: 'RecipetTemplate',
  Destination: {
    ToAddresses: [...params.to]
  },
  TemplateData: '{ "orderid": "1"}'
})
