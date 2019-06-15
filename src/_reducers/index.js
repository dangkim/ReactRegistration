import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { brand } from './brand.reducer';
import { influencers } from './influencers.reducer';
import { campaign } from './campaign.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  brand,
  influencers,
  campaign,
  alert
});

export default rootReducer;