/* @flow */

/**
 * @date  2017-11-07
 */

import type { AWSCallback, AWSContext, AWSEvent } from './types'
import * as unionAssigner from '../unionAssigner'
import { config } from '../config'
import AWS from 'aws-sdk'

AWS.config.update({ region: 'eu-central-1' })
const dynamoDB = new AWS.DynamoDB.DocumentClient()

export const getParseResults = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const params = {
    TableName: 'LadokParseResult'
  }

  dynamoDB.scan(params, (error, data) => {
    if (error) {
      callback(error)
    }
    const faculties = unionAssigner.getFaculties(data.Items)
    const trfMap = config.TRF.UnionMapping
    callback(null, unionAssigner.getUnions(trfMap, faculties))
  })
}
