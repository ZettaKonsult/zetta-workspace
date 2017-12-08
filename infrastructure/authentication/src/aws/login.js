import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from "amazon-cognito-identity-js"

const login = (username, password, cognito) => {
  const userPool = new CognitoUserPool({
    UserPoolId: cognito.USER_POOL_ID,
    ClientId: cognito.APP_CLIENT_ID
  })
  const user = new CognitoUser({ Username: username, Pool: userPool })
  const authenticationData = { Username: username, Password: password }
  const authenticationDetails = new AuthenticationDetails(authenticationData)

  return new Promise((resolve, reject) =>
    user.authenticateUser(authenticationDetails, {
      onSuccess: result => resolve(),
      onFailure: err => reject(err)
    })
  )
}

export default login
