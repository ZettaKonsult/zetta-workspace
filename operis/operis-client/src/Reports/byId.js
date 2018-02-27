import {
  FETCH_ROWS_PENDING,
  FETCH_ROWS_SUCCESS,
  FETCH_ROWS_FAILURE,
  POST_ROW_SUCCESS,
} from './ReportActions';

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ROWS_SUCCESS:
      return {
        ...state,
        ...action.payload.reduce(
          (total, row) => ({ ...total, [row.id]: row }),
          {}
        ),
      };
    case POST_ROW_SUCCESS:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};

export default byId;
