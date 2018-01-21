/* @flow */

/**
 * @date  2018-01-15
 */

import type { AWSCallback, AWSContext, AWSEvent } from '../types'
import AWS from 'aws-sdk'
import * as Membership from '../../../Membership'
import * as User from '../user'
import { getAssignments } from './assign'

AWS.config.update({ region: 'eu-central-1' })

export const saveNewAssignments = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  try {
    const assignments = await getAssignments(callback)
    const users = Object.assign({}, assignments.created, assignments.modified)

    const result = await User.saveUnions(assignments)
    console.log(`Done saving new users.`)

    await Membership.saveSubscriptions({
      users: result.registered
        .concat(result.updated)
        .reduce((object, ssn) => ({ ...object, [ssn]: users[ssn] }), {})
    })
    console.log(`Done assigning subscriptions.`)
    callback(null, result)
  } catch (error) {
    callback(error)
  }
}
