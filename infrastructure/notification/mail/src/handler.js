import aws from 'aws-sdk'
import { validateEmailParams } from './validateEmail'
import { success, failure } from './response'

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
    callback(null, success({ status: true }))
  } catch (error) {
    console.error(`${error}`)
    callback(null, failure({ status: false }))
  }
}

const sendMail = params => ses.sendTemplatedEmail(params).promise()

export const formatEmailParams = params => ({
  Source: params.from,
  Template: 'RecipetTemplate',
  Destination: {
    ToAddresses: [...params.to]
  },
  TemplateData: '{ "orderid": "1"}'
})
