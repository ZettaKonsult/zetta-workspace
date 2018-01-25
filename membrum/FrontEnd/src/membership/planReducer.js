/* @flow */
import { PLAN_LOAD_SUCCESS, PLAN_UPDATE, PLAN_ADD } from './planActions';
import type { Action, Plan } from '../types';

export type PlanState = {
  +byId: { [string]: Plan },
  +allIds: Array<string>,
};

const initialState = {
  byId: {},
  allIds: [],
};

export const reducer = (
  state: PlanState = initialState,
  action: Action
): PlanState => {
  switch (action.type) {
    case PLAN_LOAD_SUCCESS:
      return {
        ...state,
        byId: action.payload.plans.reduce(
          (result, plan) => ({ ...result, [plan.id]: plan }),
          {}
        ),
        allIds: action.payload.plans.map(plan => plan.id),
      };
    case PLAN_UPDATE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
      };
    case PLAN_ADD:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
        allIds: [...state.allIds, action.payload.id],
      };
    default:
      return state;
  }
};

export const getAllPlans = (state: PlanState) => state.allIds;

export const getPlanById = (state: PlanState, id: string) => state.byId[id];

export const getPlanOptions = (state: PlanState) => (planId: string) => {
  const detailedPlan = getPlanById(state, planId);
  if (detailedPlan.type === 'default') {
    return state.allIds.map(id => getPlanById(state, id));
  } else {
    return state.allIds
      .filter(
        p =>
          detailedPlan.type === 'trail'
            ? trailLogic(getPlanById(state, p), detailedPlan)
            : planLogic(getPlanById(state, p), detailedPlan)
      )
      .map(id => getPlanById(state, id));
  }
};

export const getDefaultPlan = (state: PlanState) =>
  state.allIds.find(id => getPlanById(state, id).type === 'default');

const trailLogic = (trail, plan) =>
  plan.group.every(group => trail.group.some(g => g === group)) &&
  plan.labels.every(label => trail.labels.some(l => l === label));

const planLogic = (plan1, plan2) => {
  return (
    plan1.type !== 'trail' &&
    (plan2.group.some(group => plan1.group.some(g => g === group)) ||
      plan2.labels.some(label => plan1.labels.some(l => l === label)))
  );
};
