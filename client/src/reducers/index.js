import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import { roomReducer as room } from './roomReducer';
import { authReducer as auth } from './authReducer';
import { TimeslotReducer as timeslot } from './timeslotReducer';

const Reducer = combineReducers({
  auth,
  room,
  router,
  timeslot,
});

export { Reducer };
