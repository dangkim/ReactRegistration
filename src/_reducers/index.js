import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { brands } from './brands.reducer';
import { influencers } from './influencers.reducer';
import { campaigns } from './campaigns.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  brands,
  influencers,
  campaigns,
  alert
});

export default rootReducer;