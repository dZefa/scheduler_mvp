import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from '../landing/landing.jsx';
import LoginPage from '../auth/login.jsx';
import ManagePage from '../manage/manageView.jsx';
import GroupContactsPage from '../groupContacts/group_manageView.jsx';
import TimeslotPage from '../timeslot/manageTimeslot.jsx';

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
        <Route path="/contacts" component={GroupContactsPage} />
        <Route path="/timeslots" component={TimeslotPage} />
      </Switch>
    )
  }
};

export default Routes;
