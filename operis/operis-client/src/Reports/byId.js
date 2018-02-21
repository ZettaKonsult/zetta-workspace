import { ADD_REPORT, UPDATE_REPORT } from './ReportActions';

const report = (state, action) => {
  switch (action.type) {
    case ADD_REPORT:
    case UPDATE_REPORT:
      return {
        id: action.id,
        ...action.report,
      };
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_REPORT:
    case UPDATE_REPORT:
      return {
        ...state,
        [action.id]: report(state[action.id], action),
      };
    default:
      return state;
  }
};

export default byId;
