import {
  NEW_USER_FAILURE,
  NEW_USER_REQUEST,
  NEW_USER_SUCCESS,
} from './registrationActions';

const initialState = {
  isLoading: false,
  success: false,
  error: undefined,
};

export function registration(state = initialState, action) {
  switch (action.type) {
    case NEW_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: undefined,
      };

    case NEW_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
      };

    case NEW_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: `Registration Error: ${action.payload.status} ${
          action.payload.statusText
        }`,
      };
    case 'UPLOAD_REGISTRATION_LIST':
    case 'UPLOAD_REGISTRATION_LIST_SUCCESS':
    case 'UPLOAD_REGISTRATION_LIST_FAILURE':
      return upload(state.upload, action);
    default:
      return state;
  }
}

const initialStateUpload = {
  progress: 0,
  done: false,
  error: undefined,
};

function upload(state = initialStateUpload, action) {
  switch (action.type) {
    case 'UPLOAD_REGISTRATION_LIST':
    case 'UPLOAD_REGISTRATION_LIST_SUCCESS':
    case 'UPLOAD_REGISTRATION_LIST_FAILURE':
    default:
      return state;
  }
}
