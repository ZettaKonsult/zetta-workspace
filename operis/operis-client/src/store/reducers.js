import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import recipient from '../Recipients/recipientReducer';
import invoice from '../Invoice/invoiceReducer';
import customer from '../CompanyCustomer/companyCustomerReducer';
import app from '../state/appReducer';

export default combineReducers({
  form: formReducer,
  recipient,
  invoice,
  customer,
  app,
});
