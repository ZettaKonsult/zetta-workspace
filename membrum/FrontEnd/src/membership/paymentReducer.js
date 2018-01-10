const initialState = {}

export function payment(state = initialState, action) {
  switch (action.type) {
    case 'ADD_PAYMENT':
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    default:
      return state
  }
}
