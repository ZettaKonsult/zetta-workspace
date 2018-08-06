import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import recipients from './Recipients/recipientReducer';
import invoice from './Invoice/invoiceReducer';

export default combineReducers({
  form: formReducer,
  recipients,
  invoice,
});
