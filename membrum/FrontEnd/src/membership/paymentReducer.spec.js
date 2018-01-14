import { payment } from './paymentReducer'
// import {ADD_PAYMENT} from './paymentActions'

describe('paymentReducer', () => {
  it('Returns initialState', () => {
    expect(payment(undefined, {})).toEqual({})
  })

  it('handles ADD_PAYMENT', () => {
    expect(
      payment(createState(), {
        type: 'ADD_PAYMENT',
        payload: { id: 1, date: '1', sum: '120', plans: [1, 2, 3] }
      })
    ).toEqual(
      createState({ 1: { id: 1, date: '1', sum: '120', plans: [1, 2, 3] } })
    )
  })
})

const createState = state => ({ ...state })
