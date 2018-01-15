/* @flow */

/**
 * @date  2018-01-15
 */

import type { AWSCallback, AWSContext, AWSEvent } from './types'
import AWS from 'aws-sdk'
import * as User from '../user'
import { getAssignments } from './assign'

AWS.config.update({ region: 'eu-central-1' })

export const saveNewAssignments = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  try {
    callback(null, await User.saveUnions(await getAssignments(callback)))
  } catch (error) {
    callback(error)
  }
}
