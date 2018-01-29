/* @flow */
import type { Plan, ThunkAction, Action } from '../types';

import cuid from 'cuid';
import db from '../mocks/db';

export const PLAN_LOAD_REQUEST = 'PLAN_LOAD_REQUEST';
export const PLAN_LOAD_SUCCESS = 'PLAN_LOAD_SUCCESS';
export const PLAN_LOAD_FAILURE = 'PLAN_LOAD_FAILURE';
export const PLAN_UPDATE = 'PLAN_UPDATE';
export const PLAN_ADD = 'PLAN_ADD';
export const PLAN_LOAD = 'PLAN_LOAD';

export const planLoadRequest = (): Action => ({
  type: PLAN_LOAD_REQUEST,
});

export const planLoadSuccess = (plans: Array<Plan>): Action => ({
  type: PLAN_LOAD_SUCCESS,
  payload: { plans },
});

export const planLoadFailure = (error: Object): Action => ({
  type: PLAN_LOAD_FAILURE,
  payload: { error },
});

export const planUpdate = (plan: Plan): Action => {
  return {
    type: PLAN_UPDATE,
    payload: plan,
  };
};

export const planLoad = (planId: string): Action => ({
  type: PLAN_LOAD,
  payload: { id: planId },
});

export const planAdd = (plan: Plan): Action => {
  return {
    type: PLAN_ADD,
    payload: {
      ...plan,
      id: cuid(),
    },
  };
};

export const planSave = (plan: Plan): ThunkAction => dispatch => {
  if (Object.keys(plan).id === undefined) {
    dispatch(planAdd(plan));
  } else {
    dispatch(planUpdate(plan));
  }
};

export const fetchAllPlans = (): ThunkAction => async dispatch => {
  dispatch(planLoadRequest());

  try {
    const plans = await db.plans;
    dispatch(planLoadSuccess(plans));
  } catch (error) {
    dispatch(planLoadFailure(error));
  }
};

export const loadPlanForEdit = (planId: string): ThunkAction => dispatch => {
  dispatch(planLoad(planId));
};
