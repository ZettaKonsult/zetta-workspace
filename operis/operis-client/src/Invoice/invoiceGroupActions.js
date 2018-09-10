import * as api from '../services';
import normalizeResponse from '../util/normalizeResponse';

export const INVOICE_GROUP_FETCH_PENDING = 'INVOICE_GROUP_FETCH_PENDING';
export const INVOICE_GROUP_FETCH_SUCCESS = 'INVOICE_GROUP_FETCH_SUCCESS';
export const INVOICE_GROUP_FETCH_FAILURE = 'INVOICE_GROUP_FETCH_FAILURE';

export const INVOICE_GROUP_CREATE_PENDING = 'INVOICE_GROUP_CREATE_PENDING';
export const INVOICE_GROUP_CREATE_SUCCESS = 'INVOICE_GROUP_CREATE_SUCCESS';
export const INVOICE_GROUP_CREATE_FAILURE = 'INVOICE_GROUP_CREATE_FAILURE';

export const fetchGroups = id => async dispath => {
  dispath({
    type: INVOICE_GROUP_FETCH_PENDING,
  });

  const result = await api.listGroups();

  dispath({
    type: INVOICE_GROUP_FETCH_SUCCESS,
    payload: { ...normalizeResponse(result) },
  });
};

export const createGroup = (name, value) => async (dispatch, getState) => {
  dispatch({
    type: INVOICE_GROUP_CREATE_PENDING,
    payload: { name, value },
  });

  const result = await api.createGroup({ name, value });

  dispatch({
    type: INVOICE_GROUP_CREATE_SUCCESS,
    payload: { ...result },
  });
};
