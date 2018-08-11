import * as api from '../services';

const COMPANYCUSTOMER_FETCH_PENDING = 'COMPANYCUSTOMER_FETCH_PENDING';
const COMPANYCUSTOMER_FETCH_SUCCESS = 'COMPANYCUSTOMER_FETCH_SUCCESS';
const COMPANYCUSTOMER_FETCH_FAILURE = 'COMPANYCUSTOMER_FETCH_FAILURE';

const COMPANYCUSTOMER_CREATE_PENDING = 'COMPANYCUSTOMER_CREATE_PENDING';
const COMPANYCUSTOMER_CREATE_SUCCESS = 'COMPANYCUSTOMER_CREATE_SUCCESS';
const COMPANYCUSTOMER_CREATE_FAILURE = 'COMPANYCUSTOMER_CREATE_FAILURE';

export const createCompanyCustomer = recipient => async dispatch => {
  dispatch({
    type: COMPANYCUSTOMER_CREATE_PENDING,
  });

  const result = await api.createCompanyCustomer({
    address: 'Road 234A',
    city: 'RecipientCity',
    email: 'firstName@recipient.com',
    firstName: 'RecipientFirst',
    lastName: 'RecipientLast',
    mobile: '+46762345678',
    ssn: '1234567890',
    zipcode: '12345',
    company: 'zetta konsult',
    VAT: '91050400356',
    bank: {
      giro: '123-4567',
      name: 'MoneyBank',
    },
  });

  dispatch({
    type: COMPANYCUSTOMER_CREATE_SUCCESS,
    payload: {
      result,
    },
  });
};

export const getCompanyCustomer = id => async dispatch => {
  dispatch({
    type: COMPANYCUSTOMER_FETCH_PENDING,
  });

  const result = await api.getCompanyCustomer(id);

  dispatch({
    type: COMPANYCUSTOMER_FETCH_SUCCESS,
    payload: {
      result,
    },
  });
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case COMPANYCUSTOMER_FETCH_SUCCESS:
    case COMPANYCUSTOMER_CREATE_SUCCESS:
      return { ...state, ...action.payload.result };
    default:
      return state;
  }
};

export default reducer;

const getState = state => state.customer;

export const getCustomerId = state => getState(state).id || '';
