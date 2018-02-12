import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import { roomReducer as room } from './roomReducer';

const Reducer = combineReducers({
  room,
  router,
});

export { Reducer };
