/* @flow */

/**
 * @date 2017-12-08
 */

import AWS from 'aws-sdk'
import util from 'util'
AWS.config.region = 'eu-central-1'
const AWSCognito = new AWS.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18'
})

export const create = async (
  event: { appId: string, projectName: string, customerName: string },
  context: {},
  callback: {}
) => {
  const poolId = event.projectName + '-' + event.customerName
  console.log(`Creating user pool ${poolId}.`)

  numberOfPools().then(firstSize => {
    createUserPool(poolId).then(() => {
      numberOfPools().then(secondSize => {
        reportResults(secondSize - firstSize, poolId)
      })
    })
  })
}

const reportResults = async (diff: number, poolId: string) => {
  if (diff <= 0) {
    console.error(`User pool ${poolId} was not created!`)
    return
  }
  if (diff > 1) {
    console.error(`User pool ${poolId} creation resulted in ${diff} new pools.`)
    return
  }
  console.log(`${poolId} created successfully.`)
}

async function createUserPool(poolId: string) {
  return new Promise((resolve, reject) => {
    resolve()
  })
  AWSCognito.createUserPool({ PoolName: poolId }, (error, data) => {
    if (error) {
      console.error(error)
    } else {
      const userPool = data.UserPool
      console.log(`Created ${userPool.Name} with ID ${userPool.Id}.`)
    }
  })
}

async function numberOfPools() {
  return new Promise((resolve, reject) => {
    AWSCognito.listUserPools({ MaxResults: 60 }, (error, data) => {
      if (error) console.log('ERROR: ' + error)
      else {
        resolve(data.UserPools.length)
      }
    })
  })
}
