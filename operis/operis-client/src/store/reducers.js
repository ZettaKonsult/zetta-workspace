import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import recipient from '../Recipients/recipientReducer';
import invoice from '../Invoice/invoiceReducer';
import profile from '../Profile/companyCustomerReducer';
import app from '../state/appReducer';

export default combineReducers({
  form: formReducer,
  recipient,
  invoice,
  profile,
  app,
});
