import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import recipient from '../Recipients/recipientReducer';
import invoice from '../Invoice/invoiceReducer';
import invoiceGroup from '../Invoice/invoiceGroupReducer';
import profile from '../Profile/companyCustomerReducer';
import app from '../state/appReducer';

const appReducer = combineReducers({
  form: formReducer,
  recipient,
  invoice,
  invoiceGroup,
  profile,
  app,
});

const rootReducer = (state, action) => {
  if (action.type === 'SIGNOUT_SUCCESS') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
