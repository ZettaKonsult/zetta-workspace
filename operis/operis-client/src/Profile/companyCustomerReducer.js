import * as api from '../services';

const COMPANYCUSTOMER_FETCH_PENDING = 'COMPANYCUSTOMER_FETCH_PENDING';
const COMPANYCUSTOMER_FETCH_SUCCESS = 'COMPANYCUSTOMER_FETCH_SUCCESS';
const COMPANYCUSTOMER_FETCH_FAILURE = 'COMPANYCUSTOMER_FETCH_FAILURE';

const COMPANYCUSTOMER_CREATE_PENDING = 'COMPANYCUSTOMER_CREATE_PENDING';
const COMPANYCUSTOMER_CREATE_SUCCESS = 'COMPANYCUSTOMER_CREATE_SUCCESS';
const COMPANYCUSTOMER_CREATE_FAILURE = 'COMPANYCUSTOMER_CREATE_FAILURE';

export const createCompanyCustomer = profile => async dispatch => {
  dispatch({
    type: COMPANYCUSTOMER_CREATE_PENDING,
  });

  const result = await api.createCompanyCustomer(profile);

  dispatch({
    type: COMPANYCUSTOMER_CREATE_SUCCESS,
    payload: {
      result,
    },
  });
};

export const getCompanyCustomer = () => async dispatch => {
  dispatch({
    type: COMPANYCUSTOMER_FETCH_PENDING,
  });

  const result = await api.getCompanyCustomer();

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

const getState = state => state.profile;

export const getCustomerId = state => getState(state).id || '';

export const getProfile = state => getState(state);
