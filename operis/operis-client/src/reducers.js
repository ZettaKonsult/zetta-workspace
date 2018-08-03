import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import recipients from './Recipients/recipientReducer';

export default combineReducers({
  form: formReducer,
  recipients,
});
