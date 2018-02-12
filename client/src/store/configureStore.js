import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { Reducer } from '../reducers';

const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(
  thunk,
  router,
  createLogger()
);

function configureStore() {
  return createStore(Reducer, enhancer);
};

export { configureStore, history };
