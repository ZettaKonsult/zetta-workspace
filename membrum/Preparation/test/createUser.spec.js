/* @flow */

/**
 * @date  2017-08-22
 */

import { Account } from 'zk-aws-users'
import { config } from '../src/config'
import { registerUser } from '../src/user/register'
import { setIdentity } from 'zk-aws-users'

const NAMES = { project: 'TestProject', customer: 'TestCustomer' }
const PASSWORD = 'myLittlePassword'
const USER_NAME = 'ZimonKuhs'
const ATTRIBUTES = {
  family_name: 'Kuhs',
  given_name: 'Zimon',
  birthdate: '9006211537',
  email: 'zmk.zk.dev@gmail.com'
}

describe('Testing user registration.', () => {
  it('Registering user.', async () => {
    setIdentity(
      '460056602695',
      'eu-central-1:6b37b86f-45d5-4b65-ac50-7f43750ea678',
      ''
    )

    try {
      await Account.loginUser(
        config.Names,
        config.Administrator.UserName,
        config.Administrator.Password
      )
    } catch (error) {
      console.error(error)
    }

    await registerUser({
      names: NAMES,
      password: PASSWORD,
      userName: USER_NAME,
      attributes: ATTRIBUTES
    })
  })
})
