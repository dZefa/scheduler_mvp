import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from '../landing/landing.jsx';

class Routes extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Switch>
        <Route path="/" component={LandingPage} />
      </Switch>
    )
  }
};

export default Routes;
