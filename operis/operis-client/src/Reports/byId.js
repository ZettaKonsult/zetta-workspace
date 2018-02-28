import { FETCH_ROWS_SUCCESS, POST_ROW_SUCCESS } from './ReportActions';

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ROWS_SUCCESS:
      return {
        ...state,
        ...action.payload.reduce(
          (total, row) => ({
            ...total,
            [row.id]: { ...row, recipientId: row.recipientIds[0] },
          }),
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
