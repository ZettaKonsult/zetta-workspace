import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import recipient from './Recipients/recipientReducer';
import invoice from './Invoice/invoiceReducer';

export default combineReducers({
  form: formReducer,
  recipient,
  invoice,
});
