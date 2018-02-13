import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from '../landing/landing.jsx';
import LoginPage from '../auth/login.jsx';
import ManagePage from '../manage/manageView.jsx';

class Routes extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/manage" component={ManagePage} />
      </Switch>
    )
  }
};

export default Routes;
