import { FETCH_ROWS_PENDING, FETCH_ROWS_SUCCESS } from './ReportActions';

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ROWS_PENDING:
      return { ...state, isFetching: true };
    case FETCH_ROWS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.payload.reduce(
          (total, row) => ({ ...total, [row.id]: row }),
          {}
        ),
      };
    default:
      return state;
  }
};

export default byId;
