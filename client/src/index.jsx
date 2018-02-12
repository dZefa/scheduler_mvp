import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import localizer from 'react-big-calendar/lib/localizers/moment'
import moment from 'moment';

import { configureStore, history } from './store/configureStore';

import './global.css';

import App from './components/app/app.jsx';

localizer(moment);

const store = configureStore();

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
