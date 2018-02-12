import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import { roomReducer as room } from './roomReducer';
import { authReducer as auth } from './authReducer';

const Reducer = combineReducers({
  auth,
  room,
  router,
});

export { Reducer };
