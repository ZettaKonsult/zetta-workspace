export const NEW_USER_REQUEST = 'NEW_USER_REQUEST'
export const NEW_USER_SUCCESS = 'NEW_USER_SUCCESS'
export const NEW_USER_FAILURE = 'NEW_USER_FAILURE'

export const newUserRequest = () => ({
  type: NEW_USER_REQUEST
})

export const newUserSuccess = () => ({
  type: NEW_USER_SUCCESS
})

export const newUserFailure = error => ({
  type: NEW_USER_FAILURE
})

export const userRegistration = user => async dispatch => {
  dispatch(newUserRequest())

  try {
    /*
      call registration service with user
      await result
    */

    dispatch(newUserSuccess())
  } catch (error) {
    dispatch(newUserFailure(error))
  }
}

export const uploadUserList = async dispatch => {
  dispatch({ type: 'UPLOAD_REGISTRATION_LIST' })

  try {
    //await upload(dest, file)
    dispatch({ type: 'UPLOAD_REGISTRATION_LIST_SUCCESS' })
  } catch (error) {
    dispatch({ type: 'UPLOAD_REGISTRATION_LIST_FAILURE' })
  }
}
