import {registration} from './registrationReducer'
import {
  NEW_USER_FAILURE,
  NEW_USER_REQUEST,
  NEW_USER_SUCCESS
} from './registrationActions'

describe('registrationReducer', () => {
  it('defaults to initalState', () => {
    expect(registration(undefined, {})).toEqual(createState())
  })

  it('should handle NEW_USER_REQUEST', () => {
    expect(registration(createState(), {type: NEW_USER_REQUEST})).toEqual(
      createState({isLoading: true})
    )
  })

  it('should handle NEW_USER_SUCCESS', () => {
    expect(registration(createState(), {type: NEW_USER_SUCCESS})).toEqual(
      createState({success: true})
    )
  })

  it('should handle NEW_USER_FAILURE', () => {
    expect(
      registration(createState(), {
        type: NEW_USER_FAILURE,
        payload: {status: '500', statusText: 'User already exists'}
      })
    ).toEqual(
      createState({error: 'Registration Error: 500 User already exists'})
    )
  })
})

const createState = state => ({
  isLoading: false,
  success: false,
  error: undefined,
  ...state
})
