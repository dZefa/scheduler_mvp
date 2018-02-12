import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'react-router-redux';
import localizer from 'react-big-calendar/lib/localizers/moment'
import moment from 'moment';

import { configureStore, history } from './store/configureStore';

import './global.css';

import App from './components/app/app.jsx';
import Loading from './components/loading/loading.jsx';

localizer(moment);

const { store, persistor } = configureStore();

render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
